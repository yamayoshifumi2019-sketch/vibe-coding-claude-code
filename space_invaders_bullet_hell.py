#!/usr/bin/env python3
"""
Space Invaders: Bullet Hell Edition
A classic shooter with bullet hell mechanics, power-ups, and boss fights.
"""

import pygame
import random
import math
from enum import Enum
from dataclasses import dataclass
from typing import List, Optional

# Initialize Pygame
pygame.init()
pygame.mixer.init()

# Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FPS = 60

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 100, 255)
YELLOW = (255, 255, 0)
PURPLE = (150, 0, 255)
CYAN = (0, 255, 255)
ORANGE = (255, 150, 0)
PINK = (255, 100, 150)

# Game states
class GameState(Enum):
    MENU = 1
    PLAYING = 2
    PAUSED = 3
    GAME_OVER = 4
    VICTORY = 5


class PowerUpType(Enum):
    RAPID_FIRE = 1
    SPREAD_SHOT = 2
    SHIELD = 3
    BOMB = 4
    EXTRA_LIFE = 5


@dataclass
class Vector2:
    x: float
    y: float


class Particle:
    """Simple particle for visual effects."""
    def __init__(self, x: float, y: float, color: tuple, velocity: Vector2, lifetime: int):
        self.x = x
        self.y = y
        self.color = color
        self.velocity = velocity
        self.lifetime = lifetime
        self.max_lifetime = lifetime

    def update(self):
        self.x += self.velocity.x
        self.y += self.velocity.y
        self.lifetime -= 1
        return self.lifetime > 0

    def draw(self, screen):
        alpha = int(255 * (self.lifetime / self.max_lifetime))
        size = max(1, int(4 * (self.lifetime / self.max_lifetime)))
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), size)


class Bullet:
    """Base bullet class for both player and enemy projectiles."""
    def __init__(self, x: float, y: float, velocity: Vector2, color: tuple,
                 radius: int = 4, damage: int = 1, is_player: bool = True):
        self.x = x
        self.y = y
        self.velocity = velocity
        self.color = color
        self.radius = radius
        self.damage = damage
        self.is_player = is_player

    def update(self):
        self.x += self.velocity.x
        self.y += self.velocity.y
        # Check if bullet is off screen
        return (0 < self.x < SCREEN_WIDTH and 0 < self.y < SCREEN_HEIGHT)

    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), self.radius)
        # Inner glow
        if self.radius > 2:
            pygame.draw.circle(screen, WHITE, (int(self.x), int(self.y)), self.radius // 2)

    def get_rect(self):
        return pygame.Rect(self.x - self.radius, self.y - self.radius,
                          self.radius * 2, self.radius * 2)


class Player:
    """Player ship with movement, shooting, and power-up handling."""
    def __init__(self):
        self.reset()

    def reset(self):
        self.x = SCREEN_WIDTH // 2
        self.y = SCREEN_HEIGHT - 80
        self.width = 40
        self.height = 30
        self.speed = 10
        self.lives = 3
        self.score = 0
        self.shoot_cooldown = 0
        self.shoot_delay = 10
        self.invincible = 0
        self.shield_active = False
        self.shield_timer = 0
        self.rapid_fire = False
        self.rapid_fire_timer = 0
        self.spread_shot = False
        self.spread_shot_timer = 0
        self.bombs = 5
        self.bomb_regen_timer = 0
        self.bomb_regen_delay = 90  # Regenerate a bomb every 1.5 seconds

    def update(self, keys):
        # Movement - full screen access, edge to edge
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            self.x = max(5, self.x - self.speed)
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            self.x = min(SCREEN_WIDTH - 5, self.x + self.speed)
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            self.y = max(5, self.y - self.speed)
        if keys[pygame.K_DOWN] or keys[pygame.K_s]:
            self.y = min(SCREEN_HEIGHT - 5, self.y + self.speed)

        # Update cooldowns and timers
        if self.shoot_cooldown > 0:
            self.shoot_cooldown -= 1
        if self.invincible > 0:
            self.invincible -= 1
        if self.shield_timer > 0:
            self.shield_timer -= 1
        else:
            self.shield_active = False
        if self.rapid_fire_timer > 0:
            self.rapid_fire_timer -= 1
        else:
            self.rapid_fire = False
        if self.spread_shot_timer > 0:
            self.spread_shot_timer -= 1
        else:
            self.spread_shot = False

        # Bomb regeneration
        if self.bombs < 5:
            self.bomb_regen_timer += 1
            if self.bomb_regen_timer >= self.bomb_regen_delay:
                self.bombs += 1
                self.bomb_regen_timer = 0

    def shoot(self) -> List[Bullet]:
        """Create bullets based on current power-ups."""
        if self.shoot_cooldown > 0:
            return []

        bullets = []
        delay = 5 if self.rapid_fire else self.shoot_delay
        self.shoot_cooldown = delay

        if self.spread_shot:
            # 5-way spread shot
            for angle in [-30, -15, 0, 15, 30]:
                rad = math.radians(angle - 90)
                vx = math.cos(rad) * 12
                vy = math.sin(rad) * 12
                bullets.append(Bullet(self.x, self.y - self.height // 2,
                                      Vector2(vx, vy), CYAN, 5, 1, True))
        else:
            # Normal shot
            bullets.append(Bullet(self.x, self.y - self.height // 2,
                                 Vector2(0, -12), CYAN, 5, 1, True))
            if self.rapid_fire:
                # Double shot when rapid fire
                bullets.append(Bullet(self.x - 10, self.y - self.height // 2,
                                     Vector2(0, -12), CYAN, 4, 1, True))
                bullets.append(Bullet(self.x + 10, self.y - self.height // 2,
                                     Vector2(0, -12), CYAN, 4, 1, True))

        return bullets

    def use_bomb(self) -> bool:
        if self.bombs > 0:
            self.bombs -= 1
            return True
        return False

    def apply_powerup(self, powerup_type: PowerUpType):
        if powerup_type == PowerUpType.RAPID_FIRE:
            self.rapid_fire = True
            self.rapid_fire_timer = 600  # 10 seconds
        elif powerup_type == PowerUpType.SPREAD_SHOT:
            self.spread_shot = True
            self.spread_shot_timer = 600
        elif powerup_type == PowerUpType.SHIELD:
            self.shield_active = True
            self.shield_timer = 480  # 8 seconds
        elif powerup_type == PowerUpType.BOMB:
            self.bombs = min(self.bombs + 1, 5)
        elif powerup_type == PowerUpType.EXTRA_LIFE:
            self.lives = min(self.lives + 1, 5)

    def hit(self) -> bool:
        """Returns True if player died."""
        if self.invincible > 0 or self.shield_active:
            return False
        self.lives -= 1
        self.invincible = 120  # 2 seconds of invincibility
        return self.lives <= 0

    def draw(self, screen):
        # Flicker when invincible
        if self.invincible > 0 and (self.invincible // 5) % 2 == 0:
            return

        # Draw ship body
        points = [
            (self.x, self.y - self.height // 2),
            (self.x - self.width // 2, self.y + self.height // 2),
            (self.x + self.width // 2, self.y + self.height // 2)
        ]
        pygame.draw.polygon(screen, GREEN, points)
        pygame.draw.polygon(screen, WHITE, points, 2)

        # Draw cockpit
        pygame.draw.circle(screen, CYAN, (int(self.x), int(self.y)), 8)

        # Draw shield if active
        if self.shield_active:
            pygame.draw.circle(screen, (100, 200, 255), (int(self.x), int(self.y)),
                             self.width, 2)

    def get_rect(self):
        return pygame.Rect(self.x - self.width // 2, self.y - self.height // 2,
                          self.width, self.height)


class Enemy:
    """Base enemy class."""
    def __init__(self, x: float, y: float, enemy_type: int = 0):
        self.x = x
        self.y = y
        self.enemy_type = enemy_type
        self.width = 30
        self.height = 25
        self.health = 1 + enemy_type
        self.max_health = self.health
        self.shoot_timer = random.randint(30, 120)
        self.move_timer = 0
        self.move_direction = 1
        self.speed = 1 + enemy_type * 0.5
        self.points = 100 * (1 + enemy_type)

        # Colors based on type
        self.colors = [RED, ORANGE, PURPLE, PINK]
        self.color = self.colors[enemy_type % len(self.colors)]

    def update(self, wave: int) -> List[Bullet]:
        bullets = []

        # Movement pattern
        self.move_timer += 1
        if self.move_timer > 60:
            self.move_timer = 0
            self.move_direction *= -1

        self.x += self.move_direction * self.speed
        self.y += 0.3 + wave * 0.05  # Descend faster in higher waves

        # Shooting
        self.shoot_timer -= 1
        if self.shoot_timer <= 0:
            self.shoot_timer = random.randint(60 - wave * 2, 150 - wave * 5)
            self.shoot_timer = max(30, self.shoot_timer)
            bullets.extend(self.create_bullets(wave))

        return bullets

    def create_bullets(self, wave: int) -> List[Bullet]:
        bullets = []
        if self.enemy_type == 0:
            # Simple straight shot
            bullets.append(Bullet(self.x, self.y + self.height // 2,
                                 Vector2(0, 5), YELLOW, 4, 1, False))
        elif self.enemy_type == 1:
            # Double shot
            bullets.append(Bullet(self.x - 8, self.y + self.height // 2,
                                 Vector2(-1, 5), ORANGE, 4, 1, False))
            bullets.append(Bullet(self.x + 8, self.y + self.height // 2,
                                 Vector2(1, 5), ORANGE, 4, 1, False))
        elif self.enemy_type == 2:
            # Triple spread
            for angle in [-20, 0, 20]:
                rad = math.radians(angle + 90)
                vx = math.cos(rad) * 5
                vy = math.sin(rad) * 5
                bullets.append(Bullet(self.x, self.y + self.height // 2,
                                     Vector2(vx, vy), PURPLE, 5, 1, False))
        else:
            # Aimed shot at player (will be adjusted in game loop)
            bullets.append(Bullet(self.x, self.y + self.height // 2,
                                 Vector2(0, 6), PINK, 6, 1, False))
        return bullets

    def hit(self, damage: int = 1) -> bool:
        """Returns True if enemy is destroyed."""
        self.health -= damage
        return self.health <= 0

    def draw(self, screen):
        # Draw alien body
        pygame.draw.rect(screen, self.color,
                        (self.x - self.width // 2, self.y - self.height // 2,
                         self.width, self.height), border_radius=5)

        # Draw eyes
        eye_y = self.y - 3
        pygame.draw.circle(screen, WHITE, (int(self.x - 7), int(eye_y)), 5)
        pygame.draw.circle(screen, WHITE, (int(self.x + 7), int(eye_y)), 5)
        pygame.draw.circle(screen, BLACK, (int(self.x - 7), int(eye_y)), 2)
        pygame.draw.circle(screen, BLACK, (int(self.x + 7), int(eye_y)), 2)

        # Health bar for stronger enemies
        if self.max_health > 1:
            bar_width = self.width
            bar_height = 3
            health_ratio = self.health / self.max_health
            pygame.draw.rect(screen, RED,
                           (self.x - bar_width // 2, self.y - self.height // 2 - 8,
                            bar_width, bar_height))
            pygame.draw.rect(screen, GREEN,
                           (self.x - bar_width // 2, self.y - self.height // 2 - 8,
                            int(bar_width * health_ratio), bar_height))

    def get_rect(self):
        return pygame.Rect(self.x - self.width // 2, self.y - self.height // 2,
                          self.width, self.height)

    def is_off_screen(self):
        return self.y > SCREEN_HEIGHT + 50


class Boss:
    """Boss enemy with multiple attack patterns."""
    def __init__(self, boss_level: int = 1):
        self.x = SCREEN_WIDTH // 2
        self.y = -100
        self.target_y = 80
        self.width = 120
        self.height = 80
        self.boss_level = boss_level
        self.health = 50 * boss_level
        self.max_health = self.health
        self.phase = 0
        self.attack_timer = 0
        self.attack_pattern = 0
        self.move_timer = 0
        self.move_direction = 1
        self.speed = 2
        self.entering = True
        self.points = 5000 * boss_level

    def update(self, player_x: float) -> List[Bullet]:
        bullets = []

        # Entry animation
        if self.entering:
            self.y += 2
            if self.y >= self.target_y:
                self.y = self.target_y
                self.entering = False
            return bullets

        # Movement
        self.move_timer += 1
        self.x += math.sin(self.move_timer * 0.02) * self.speed

        # Keep on screen
        self.x = max(self.width // 2, min(SCREEN_WIDTH - self.width // 2, self.x))

        # Attack patterns
        self.attack_timer += 1

        # Change pattern based on health
        health_ratio = self.health / self.max_health
        if health_ratio < 0.3:
            self.phase = 2
        elif health_ratio < 0.6:
            self.phase = 1

        # Execute attack patterns
        if self.attack_timer >= 30 - self.phase * 5:
            self.attack_timer = 0
            self.attack_pattern = (self.attack_pattern + 1) % 4
            bullets.extend(self.create_attack_pattern(player_x))

        return bullets

    def create_attack_pattern(self, player_x: float) -> List[Bullet]:
        bullets = []
        pattern = self.attack_pattern

        if pattern == 0:
            # Circular burst
            num_bullets = 12 + self.phase * 4
            for i in range(num_bullets):
                angle = (360 / num_bullets) * i
                rad = math.radians(angle)
                speed = 4 + self.phase
                vx = math.cos(rad) * speed
                vy = math.sin(rad) * speed
                bullets.append(Bullet(self.x, self.y + self.height // 2,
                                     Vector2(vx, vy), RED, 6, 1, False))

        elif pattern == 1:
            # Aimed spread
            dx = player_x - self.x
            angle = math.atan2(400, dx) if dx != 0 else math.pi / 2
            spread = 15 + self.phase * 5
            for i in range(-2 - self.phase, 3 + self.phase):
                rad = angle + math.radians(i * spread)
                speed = 5 + self.phase
                vx = math.sin(rad) * speed
                vy = math.cos(rad) * speed
                bullets.append(Bullet(self.x, self.y + self.height // 2,
                                     Vector2(vx, vy), ORANGE, 5, 1, False))

        elif pattern == 2:
            # Spiral pattern
            base_angle = self.move_timer * 10
            for i in range(4 + self.phase * 2):
                angle = base_angle + i * (360 / (4 + self.phase * 2))
                rad = math.radians(angle)
                speed = 3 + self.phase
                vx = math.cos(rad) * speed
                vy = math.sin(rad) * speed
                bullets.append(Bullet(self.x, self.y + self.height // 2,
                                     Vector2(vx, vy), PURPLE, 5, 1, False))

        else:
            # Rain pattern
            for i in range(5 + self.phase * 2):
                offset = (i - (2 + self.phase)) * 20
                bullets.append(Bullet(self.x + offset, self.y + self.height // 2,
                                     Vector2(random.uniform(-1, 1), 4 + self.phase),
                                     YELLOW, 4, 1, False))

        return bullets

    def hit(self, damage: int = 1) -> bool:
        self.health -= damage
        return self.health <= 0

    def draw(self, screen):
        if self.entering:
            pass  # Could add entry effects

        # Main body
        pygame.draw.rect(screen, PURPLE,
                        (self.x - self.width // 2, self.y - self.height // 2,
                         self.width, self.height), border_radius=10)
        pygame.draw.rect(screen, WHITE,
                        (self.x - self.width // 2, self.y - self.height // 2,
                         self.width, self.height), 3, border_radius=10)

        # Core
        core_color = RED if self.phase >= 1 else ORANGE
        pygame.draw.circle(screen, core_color, (int(self.x), int(self.y)), 20)
        pygame.draw.circle(screen, WHITE, (int(self.x), int(self.y)), 20, 2)

        # Eyes
        pygame.draw.circle(screen, YELLOW, (int(self.x - 30), int(self.y - 15)), 12)
        pygame.draw.circle(screen, YELLOW, (int(self.x + 30), int(self.y - 15)), 12)
        pygame.draw.circle(screen, RED, (int(self.x - 30), int(self.y - 15)), 6)
        pygame.draw.circle(screen, RED, (int(self.x + 30), int(self.y - 15)), 6)

        # Health bar
        bar_width = self.width + 40
        bar_height = 10
        bar_x = self.x - bar_width // 2
        bar_y = 20
        health_ratio = self.health / self.max_health
        pygame.draw.rect(screen, (50, 50, 50), (bar_x, bar_y, bar_width, bar_height))
        pygame.draw.rect(screen, RED, (bar_x, bar_y, int(bar_width * health_ratio), bar_height))
        pygame.draw.rect(screen, WHITE, (bar_x, bar_y, bar_width, bar_height), 2)

    def get_rect(self):
        return pygame.Rect(self.x - self.width // 2, self.y - self.height // 2,
                          self.width, self.height)


class PowerUp:
    """Collectible power-up item."""
    def __init__(self, x: float, y: float, powerup_type: PowerUpType):
        self.x = x
        self.y = y
        self.powerup_type = powerup_type
        self.radius = 15
        self.speed = 2
        self.timer = 0

        # Colors for each type
        self.colors = {
            PowerUpType.RAPID_FIRE: YELLOW,
            PowerUpType.SPREAD_SHOT: CYAN,
            PowerUpType.SHIELD: BLUE,
            PowerUpType.BOMB: RED,
            PowerUpType.EXTRA_LIFE: GREEN
        }
        self.color = self.colors[powerup_type]

    def update(self) -> bool:
        self.y += self.speed
        self.timer += 1
        return self.y < SCREEN_HEIGHT + 50

    def draw(self, screen):
        # Pulsing effect
        pulse = abs(math.sin(self.timer * 0.1)) * 5

        pygame.draw.circle(screen, self.color,
                          (int(self.x), int(self.y)), int(self.radius + pulse))
        pygame.draw.circle(screen, WHITE,
                          (int(self.x), int(self.y)), int(self.radius + pulse), 2)

        # Icon based on type
        if self.powerup_type == PowerUpType.RAPID_FIRE:
            pygame.draw.polygon(screen, WHITE, [
                (self.x, self.y - 8), (self.x - 6, self.y + 6), (self.x + 6, self.y + 6)
            ])
        elif self.powerup_type == PowerUpType.SPREAD_SHOT:
            for angle in [-30, 0, 30]:
                rad = math.radians(angle - 90)
                pygame.draw.line(screen, WHITE, (self.x, self.y),
                               (self.x + math.cos(rad) * 10, self.y + math.sin(rad) * 10), 2)
        elif self.powerup_type == PowerUpType.SHIELD:
            pygame.draw.circle(screen, WHITE, (int(self.x), int(self.y)), 8, 2)
        elif self.powerup_type == PowerUpType.BOMB:
            pygame.draw.circle(screen, WHITE, (int(self.x), int(self.y)), 6)
        elif self.powerup_type == PowerUpType.EXTRA_LIFE:
            # Heart shape
            pygame.draw.polygon(screen, WHITE, [
                (self.x, self.y + 6), (self.x - 8, self.y - 2),
                (self.x, self.y - 8), (self.x + 8, self.y - 2)
            ])

    def get_rect(self):
        return pygame.Rect(self.x - self.radius, self.y - self.radius,
                          self.radius * 2, self.radius * 2)


class StarField:
    """Scrolling star background."""
    def __init__(self):
        self.stars = []
        for _ in range(100):
            x = random.randint(0, SCREEN_WIDTH)
            y = random.randint(0, SCREEN_HEIGHT)
            speed = random.uniform(1, 3)
            brightness = random.randint(100, 255)
            self.stars.append([x, y, speed, brightness])

    def update(self):
        for star in self.stars:
            star[1] += star[2]
            if star[1] > SCREEN_HEIGHT:
                star[0] = random.randint(0, SCREEN_WIDTH)
                star[1] = 0

    def draw(self, screen):
        for star in self.stars:
            color = (star[3], star[3], star[3])
            size = 1 if star[2] < 2 else 2
            pygame.draw.circle(screen, color, (int(star[0]), int(star[1])), size)


class Game:
    """Main game class."""
    def __init__(self):
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption("Space Invaders: Bullet Hell Edition")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.big_font = pygame.font.Font(None, 72)

        self.state = GameState.MENU
        self.starfield = StarField()
        self.reset_game()

    def reset_game(self):
        self.player = Player()
        self.enemies: List[Enemy] = []
        self.bullets: List[Bullet] = []
        self.powerups: List[PowerUp] = []
        self.particles: List[Particle] = []
        self.boss: Optional[Boss] = None
        self.wave = 1
        self.wave_enemies_remaining = 0
        self.wave_delay = 0
        self.boss_wave = False
        self.high_score = self.load_high_score()
        self.spawn_wave()

    def load_high_score(self) -> int:
        try:
            with open("highscore.txt", "r") as f:
                return int(f.read().strip())
        except:
            return 0

    def save_high_score(self):
        if self.player.score > self.high_score:
            self.high_score = self.player.score
            try:
                with open("highscore.txt", "w") as f:
                    f.write(str(self.high_score))
            except:
                pass

    def spawn_wave(self):
        """Spawn a new wave of enemies."""
        self.wave_delay = 60

        # Boss every 5 waves
        if self.wave % 5 == 0:
            self.boss_wave = True
            self.boss = Boss(self.wave // 5)
        else:
            self.boss_wave = False
            self.boss = None

            # Regular enemies
            rows = min(3 + self.wave // 2, 6)
            cols = min(6 + self.wave // 3, 10)

            for row in range(rows):
                for col in range(cols):
                    x = 100 + col * 70
                    y = -50 - row * 50
                    enemy_type = min(row // 2, 3)
                    self.enemies.append(Enemy(x, y, enemy_type))

            self.wave_enemies_remaining = len(self.enemies)

    def spawn_explosion(self, x: float, y: float, color: tuple, count: int = 15):
        """Create explosion particles."""
        for _ in range(count):
            angle = random.uniform(0, 2 * math.pi)
            speed = random.uniform(2, 6)
            vx = math.cos(angle) * speed
            vy = math.sin(angle) * speed
            lifetime = random.randint(20, 40)
            self.particles.append(Particle(x, y, color, Vector2(vx, vy), lifetime))

    def spawn_powerup(self, x: float, y: float):
        """Randomly spawn a power-up."""
        if random.random() < 0.15:  # 15% chance
            powerup_type = random.choice(list(PowerUpType))
            self.powerups.append(PowerUp(x, y, powerup_type))

    def use_bomb(self):
        """Clear all enemy bullets and damage all enemies."""
        if self.player.use_bomb():
            # Clear enemy bullets
            for bullet in self.bullets[:]:
                if not bullet.is_player:
                    self.spawn_explosion(bullet.x, bullet.y, WHITE, 5)
            self.bullets = [b for b in self.bullets if b.is_player]

            # Damage all enemies
            for enemy in self.enemies:
                enemy.hit(2)
                self.spawn_explosion(enemy.x, enemy.y, enemy.color, 8)
            self.enemies = [e for e in self.enemies if e.health > 0]

            # Damage boss
            if self.boss:
                self.boss.hit(10)
                self.spawn_explosion(self.boss.x, self.boss.y, PURPLE, 20)

    def handle_collisions(self):
        """Check and handle all collisions."""
        player_rect = self.player.get_rect()

        # Player bullets vs enemies
        for bullet in self.bullets[:]:
            if not bullet.is_player:
                continue
            bullet_rect = bullet.get_rect()

            # Check enemies
            for enemy in self.enemies[:]:
                if bullet_rect.colliderect(enemy.get_rect()):
                    if enemy.hit(bullet.damage):
                        self.player.score += enemy.points
                        self.spawn_explosion(enemy.x, enemy.y, enemy.color)
                        self.spawn_powerup(enemy.x, enemy.y)
                        self.enemies.remove(enemy)
                        self.wave_enemies_remaining -= 1
                    if bullet in self.bullets:
                        self.bullets.remove(bullet)
                    break

            # Check boss
            if self.boss and bullet in self.bullets:
                if bullet_rect.colliderect(self.boss.get_rect()):
                    if self.boss.hit(bullet.damage):
                        self.player.score += self.boss.points
                        self.spawn_explosion(self.boss.x, self.boss.y, PURPLE, 50)
                        self.boss = None
                        self.wave += 1
                        if self.wave > 15:  # Victory at wave 15
                            self.state = GameState.VICTORY
                            self.save_high_score()
                        else:
                            self.spawn_wave()
                    self.bullets.remove(bullet)

        # Enemy bullets vs player
        for bullet in self.bullets[:]:
            if bullet.is_player:
                continue
            if bullet.get_rect().colliderect(player_rect):
                if self.player.hit():
                    self.state = GameState.GAME_OVER
                    self.save_high_score()
                else:
                    self.spawn_explosion(self.player.x, self.player.y, GREEN, 10)
                self.bullets.remove(bullet)

        # Enemies vs player
        for enemy in self.enemies[:]:
            if enemy.get_rect().colliderect(player_rect):
                if self.player.hit():
                    self.state = GameState.GAME_OVER
                    self.save_high_score()
                self.spawn_explosion(enemy.x, enemy.y, enemy.color)
                self.enemies.remove(enemy)
                self.wave_enemies_remaining -= 1

        # Power-ups vs player
        for powerup in self.powerups[:]:
            if powerup.get_rect().colliderect(player_rect):
                self.player.apply_powerup(powerup.powerup_type)
                self.powerups.remove(powerup)
                self.spawn_explosion(powerup.x, powerup.y, powerup.color, 8)

    def update(self):
        """Update game state."""
        if self.state != GameState.PLAYING:
            return

        keys = pygame.key.get_pressed()

        # Update starfield
        self.starfield.update()

        # Update player
        self.player.update(keys)

        # Shooting
        if keys[pygame.K_SPACE]:
            self.bullets.extend(self.player.shoot())

        # Update bullets
        self.bullets = [b for b in self.bullets if b.update()]

        # Update enemies
        for enemy in self.enemies[:]:
            new_bullets = enemy.update(self.wave)
            # Aim bullets at player for type 3 enemies
            for bullet in new_bullets:
                if enemy.enemy_type >= 3:
                    dx = self.player.x - bullet.x
                    dy = self.player.y - bullet.y
                    dist = math.sqrt(dx * dx + dy * dy)
                    if dist > 0:
                        bullet.velocity.x = (dx / dist) * 6
                        bullet.velocity.y = (dy / dist) * 6
            self.bullets.extend(new_bullets)

            if enemy.is_off_screen():
                self.enemies.remove(enemy)
                self.wave_enemies_remaining -= 1

        # Update boss
        if self.boss:
            new_bullets = self.boss.update(self.player.x)
            self.bullets.extend(new_bullets)

        # Update power-ups
        self.powerups = [p for p in self.powerups if p.update()]

        # Update particles
        self.particles = [p for p in self.particles if p.update()]

        # Check collisions
        self.handle_collisions()

        # Wave management
        if self.wave_delay > 0:
            self.wave_delay -= 1
        elif not self.boss_wave and self.wave_enemies_remaining <= 0 and not self.enemies:
            self.wave += 1
            if self.wave > 15:
                self.state = GameState.VICTORY
                self.save_high_score()
            else:
                self.spawn_wave()

    def draw(self):
        """Draw everything."""
        self.screen.fill(BLACK)

        # Draw starfield
        self.starfield.draw(self.screen)

        if self.state == GameState.MENU:
            self.draw_menu()
        elif self.state == GameState.PLAYING or self.state == GameState.PAUSED:
            self.draw_game()
            if self.state == GameState.PAUSED:
                self.draw_pause()
        elif self.state == GameState.GAME_OVER:
            self.draw_game()
            self.draw_game_over()
        elif self.state == GameState.VICTORY:
            self.draw_game()
            self.draw_victory()

        pygame.display.flip()

    def draw_menu(self):
        """Draw main menu."""
        title = self.big_font.render("SPACE INVADERS", True, CYAN)
        subtitle = self.font.render("Bullet Hell Edition", True, WHITE)
        start = self.font.render("Press ENTER to Start", True, GREEN)
        controls = self.font.render("WASD/Arrows: Move | SPACE: Shoot | B: Bomb", True, WHITE)
        high = self.font.render(f"High Score: {self.high_score}", True, YELLOW)

        self.screen.blit(title, (SCREEN_WIDTH // 2 - title.get_width() // 2, 150))
        self.screen.blit(subtitle, (SCREEN_WIDTH // 2 - subtitle.get_width() // 2, 220))
        self.screen.blit(start, (SCREEN_WIDTH // 2 - start.get_width() // 2, 350))
        self.screen.blit(controls, (SCREEN_WIDTH // 2 - controls.get_width() // 2, 420))
        self.screen.blit(high, (SCREEN_WIDTH // 2 - high.get_width() // 2, 480))

    def draw_game(self):
        """Draw game elements."""
        # Draw particles (behind everything)
        for particle in self.particles:
            particle.draw(self.screen)

        # Draw power-ups
        for powerup in self.powerups:
            powerup.draw(self.screen)

        # Draw bullets
        for bullet in self.bullets:
            bullet.draw(self.screen)

        # Draw enemies
        for enemy in self.enemies:
            enemy.draw(self.screen)

        # Draw boss
        if self.boss:
            self.boss.draw(self.screen)

        # Draw player
        self.player.draw(self.screen)

        # Draw UI
        self.draw_ui()

    def draw_ui(self):
        """Draw game UI."""
        # Score
        score_text = self.font.render(f"Score: {self.player.score}", True, WHITE)
        self.screen.blit(score_text, (10, 10))

        # Wave
        wave_text = self.font.render(f"Wave: {self.wave}", True, WHITE)
        self.screen.blit(wave_text, (SCREEN_WIDTH - 120, 10))

        # Lives
        for i in range(self.player.lives):
            pygame.draw.polygon(self.screen, GREEN, [
                (30 + i * 30, SCREEN_HEIGHT - 20),
                (20 + i * 30, SCREEN_HEIGHT - 10),
                (40 + i * 30, SCREEN_HEIGHT - 10)
            ])

        # Bombs
        for i in range(self.player.bombs):
            pygame.draw.circle(self.screen, RED, (SCREEN_WIDTH - 30 - i * 25, SCREEN_HEIGHT - 15), 8)

        # Active power-ups
        y_offset = 50
        if self.player.rapid_fire:
            text = self.font.render(f"Rapid Fire: {self.player.rapid_fire_timer // 60}s", True, YELLOW)
            self.screen.blit(text, (10, y_offset))
            y_offset += 25
        if self.player.spread_shot:
            text = self.font.render(f"Spread Shot: {self.player.spread_shot_timer // 60}s", True, CYAN)
            self.screen.blit(text, (10, y_offset))
            y_offset += 25
        if self.player.shield_active:
            text = self.font.render(f"Shield: {self.player.shield_timer // 60}s", True, BLUE)
            self.screen.blit(text, (10, y_offset))

    def draw_pause(self):
        """Draw pause overlay."""
        overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT), pygame.SRCALPHA)
        overlay.fill((0, 0, 0, 128))
        self.screen.blit(overlay, (0, 0))

        pause_text = self.big_font.render("PAUSED", True, WHITE)
        resume_text = self.font.render("Press P to Resume", True, GREEN)

        self.screen.blit(pause_text, (SCREEN_WIDTH // 2 - pause_text.get_width() // 2, 250))
        self.screen.blit(resume_text, (SCREEN_WIDTH // 2 - resume_text.get_width() // 2, 330))

    def draw_game_over(self):
        """Draw game over screen."""
        overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT), pygame.SRCALPHA)
        overlay.fill((0, 0, 0, 180))
        self.screen.blit(overlay, (0, 0))

        game_over = self.big_font.render("GAME OVER", True, RED)
        score = self.font.render(f"Final Score: {self.player.score}", True, WHITE)
        high = self.font.render(f"High Score: {self.high_score}", True, YELLOW)
        restart = self.font.render("Press ENTER to Restart", True, GREEN)

        self.screen.blit(game_over, (SCREEN_WIDTH // 2 - game_over.get_width() // 2, 200))
        self.screen.blit(score, (SCREEN_WIDTH // 2 - score.get_width() // 2, 290))
        self.screen.blit(high, (SCREEN_WIDTH // 2 - high.get_width() // 2, 330))
        self.screen.blit(restart, (SCREEN_WIDTH // 2 - restart.get_width() // 2, 400))

    def draw_victory(self):
        """Draw victory screen."""
        overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT), pygame.SRCALPHA)
        overlay.fill((0, 0, 0, 180))
        self.screen.blit(overlay, (0, 0))

        victory = self.big_font.render("VICTORY!", True, YELLOW)
        score = self.font.render(f"Final Score: {self.player.score}", True, WHITE)
        message = self.font.render("You saved Earth from the alien invasion!", True, CYAN)
        restart = self.font.render("Press ENTER to Play Again", True, GREEN)

        self.screen.blit(victory, (SCREEN_WIDTH // 2 - victory.get_width() // 2, 200))
        self.screen.blit(score, (SCREEN_WIDTH // 2 - score.get_width() // 2, 290))
        self.screen.blit(message, (SCREEN_WIDTH // 2 - message.get_width() // 2, 330))
        self.screen.blit(restart, (SCREEN_WIDTH // 2 - restart.get_width() // 2, 400))

    def run(self):
        """Main game loop."""
        running = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        running = False
                    elif event.key == pygame.K_RETURN:
                        if self.state == GameState.MENU:
                            self.state = GameState.PLAYING
                        elif self.state in (GameState.GAME_OVER, GameState.VICTORY):
                            self.reset_game()
                            self.state = GameState.PLAYING
                    elif event.key == pygame.K_p and self.state in (GameState.PLAYING, GameState.PAUSED):
                        self.state = GameState.PAUSED if self.state == GameState.PLAYING else GameState.PLAYING
                    elif event.key == pygame.K_b and self.state == GameState.PLAYING:
                        self.use_bomb()

            self.update()
            self.draw()
            self.clock.tick(FPS)

        pygame.quit()


if __name__ == "__main__":
    game = Game()
    game.run()
