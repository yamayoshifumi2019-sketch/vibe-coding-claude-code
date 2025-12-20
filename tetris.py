import pygame
import random

# Initialize Pygame
pygame.init()

# Game constants
COLS = 10
ROWS = 20
CELL_SIZE = 30
SIDEBAR_WIDTH = 150

# Window dimensions
WINDOW_WIDTH = COLS * CELL_SIZE + SIDEBAR_WIDTH
WINDOW_HEIGHT = ROWS * CELL_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (128, 128, 128)
DARK_GRAY = (40, 40, 40)

# Tetromino colors
COLORS = {
    'I': (0, 255, 255),    # Cyan
    'O': (255, 255, 0),    # Yellow
    'T': (128, 0, 128),    # Purple
    'S': (0, 255, 0),      # Green
    'Z': (255, 0, 0),      # Red
    'J': (0, 0, 255),      # Blue
    'L': (255, 165, 0),    # Orange
}

# Tetromino shapes (each rotation state as list of (x, y) offsets from center)
SHAPES = {
    'I': [
        [(0, -1), (0, 0), (0, 1), (0, 2)],
        [(-1, 0), (0, 0), (1, 0), (2, 0)],
        [(0, -1), (0, 0), (0, 1), (0, 2)],
        [(-1, 0), (0, 0), (1, 0), (2, 0)],
    ],
    'O': [
        [(0, 0), (1, 0), (0, 1), (1, 1)],
        [(0, 0), (1, 0), (0, 1), (1, 1)],
        [(0, 0), (1, 0), (0, 1), (1, 1)],
        [(0, 0), (1, 0), (0, 1), (1, 1)],
    ],
    'T': [
        [(-1, 0), (0, 0), (1, 0), (0, -1)],
        [(0, -1), (0, 0), (0, 1), (1, 0)],
        [(-1, 0), (0, 0), (1, 0), (0, 1)],
        [(0, -1), (0, 0), (0, 1), (-1, 0)],
    ],
    'S': [
        [(0, 0), (1, 0), (-1, 1), (0, 1)],
        [(0, -1), (0, 0), (1, 0), (1, 1)],
        [(0, 0), (1, 0), (-1, 1), (0, 1)],
        [(0, -1), (0, 0), (1, 0), (1, 1)],
    ],
    'Z': [
        [(-1, 0), (0, 0), (0, 1), (1, 1)],
        [(1, -1), (0, 0), (1, 0), (0, 1)],
        [(-1, 0), (0, 0), (0, 1), (1, 1)],
        [(1, -1), (0, 0), (1, 0), (0, 1)],
    ],
    'J': [
        [(-1, -1), (-1, 0), (0, 0), (1, 0)],
        [(0, -1), (1, -1), (0, 0), (0, 1)],
        [(-1, 0), (0, 0), (1, 0), (1, 1)],
        [(0, -1), (0, 0), (-1, 1), (0, 1)],
    ],
    'L': [
        [(1, -1), (-1, 0), (0, 0), (1, 0)],
        [(0, -1), (0, 0), (0, 1), (1, 1)],
        [(-1, 0), (0, 0), (1, 0), (-1, 1)],
        [(-1, -1), (0, -1), (0, 0), (0, 1)],
    ],
}


class Piece:
    def __init__(self, shape_type):
        self.type = shape_type
        self.color = COLORS[shape_type]
        self.rotation = 0
        self.x = COLS // 2
        self.y = 0

    def get_blocks(self):
        """Get absolute positions of all blocks in current rotation."""
        shape = SHAPES[self.type][self.rotation]
        return [(self.x + dx, self.y + dy) for dx, dy in shape]

    def rotate(self):
        """Rotate piece clockwise."""
        self.rotation = (self.rotation + 1) % 4


class Tetris:
    def __init__(self):
        self.screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        pygame.display.set_caption("Tetris")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.small_font = pygame.font.Font(None, 24)
        self.reset_game()

    def reset_game(self):
        """Reset all game state."""
        self.board = [[None for _ in range(COLS)] for _ in range(ROWS)]
        self.current_piece = self.new_piece()
        self.next_piece = self.new_piece()
        self.score = 0
        self.level = 1
        self.lines_cleared = 0
        self.game_over = False
        self.paused = False
        self.drop_time = 0
        self.drop_interval = 1000  # milliseconds
        # Key repeat timers
        self.key_delay = 170  # Initial delay before repeat
        self.key_repeat = 50  # Repeat interval
        self.key_timers = {'left': 0, 'right': 0, 'down': 0}
        self.key_states = {'left': False, 'right': False, 'down': False}

    def new_piece(self):
        """Create a new random piece."""
        shape_type = random.choice(list(SHAPES.keys()))
        return Piece(shape_type)

    def valid_position(self, piece, dx=0, dy=0, rotation=None):
        """Check if piece position is valid."""
        old_rotation = piece.rotation
        if rotation is not None:
            piece.rotation = rotation

        for x, y in piece.get_blocks():
            new_x = x + dx
            new_y = y + dy

            # Check bounds
            if new_x < 0 or new_x >= COLS or new_y >= ROWS:
                piece.rotation = old_rotation
                return False

            # Check collision with placed blocks (ignore if above board)
            if new_y >= 0 and self.board[new_y][new_x] is not None:
                piece.rotation = old_rotation
                return False

        piece.rotation = old_rotation
        return True

    def lock_piece(self):
        """Lock current piece to board."""
        for x, y in self.current_piece.get_blocks():
            if y >= 0:
                self.board[y][x] = self.current_piece.color

        # Clear lines
        lines = self.clear_lines()
        if lines > 0:
            self.lines_cleared += lines
            # Scoring
            scores = {1: 100, 2: 300, 3: 500, 4: 800}
            self.score += scores.get(lines, 0) * self.level
            # Level up every 10 lines
            self.level = self.lines_cleared // 10 + 1
            # Speed up
            self.drop_interval = max(100, 1000 - (self.level - 1) * 100)

        # Spawn next piece
        self.current_piece = self.next_piece
        self.next_piece = self.new_piece()

        # Check game over
        if not self.valid_position(self.current_piece):
            self.game_over = True

    def clear_lines(self):
        """Clear completed lines and return count."""
        lines_to_clear = []
        for y in range(ROWS):
            if all(self.board[y][x] is not None for x in range(COLS)):
                lines_to_clear.append(y)

        for y in lines_to_clear:
            del self.board[y]
            self.board.insert(0, [None for _ in range(COLS)])

        return len(lines_to_clear)

    def move(self, dx, dy):
        """Move piece if valid."""
        if self.valid_position(self.current_piece, dx, dy):
            self.current_piece.x += dx
            self.current_piece.y += dy
            return True
        return False

    def rotate(self):
        """Rotate piece with wall kick."""
        new_rotation = (self.current_piece.rotation + 1) % 4

        # Try normal rotation
        if self.valid_position(self.current_piece, rotation=new_rotation):
            self.current_piece.rotation = new_rotation
            return True

        # Try wall kicks
        for dx in [-1, 1, -2, 2]:
            if self.valid_position(self.current_piece, dx, 0, new_rotation):
                self.current_piece.x += dx
                self.current_piece.rotation = new_rotation
                return True

        return False

    def hard_drop(self):
        """Drop piece instantly."""
        while self.move(0, 1):
            self.score += 2
        self.lock_piece()

    def draw(self):
        """Draw the game."""
        self.screen.fill(BLACK)

        # Draw board background
        for y in range(ROWS):
            for x in range(COLS):
                rect = pygame.Rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
                pygame.draw.rect(self.screen, DARK_GRAY, rect, 1)

        # Draw placed blocks
        for y in range(ROWS):
            for x in range(COLS):
                if self.board[y][x] is not None:
                    self.draw_block(x, y, self.board[y][x])

        # Draw current piece
        if not self.game_over:
            for x, y in self.current_piece.get_blocks():
                if y >= 0:
                    self.draw_block(x, y, self.current_piece.color)

        # Draw sidebar
        sidebar_x = COLS * CELL_SIZE + 10

        # Next piece preview
        next_text = self.font.render("Next:", True, WHITE)
        self.screen.blit(next_text, (sidebar_x, 10))

        # Draw next piece
        preview_offset_x = sidebar_x + 30
        preview_offset_y = 50
        for dx, dy in SHAPES[self.next_piece.type][0]:
            rect = pygame.Rect(
                preview_offset_x + dx * 20,
                preview_offset_y + dy * 20,
                18, 18
            )
            pygame.draw.rect(self.screen, self.next_piece.color, rect)
            pygame.draw.rect(self.screen, WHITE, rect, 1)

        # Score
        score_text = self.font.render("Score:", True, WHITE)
        self.screen.blit(score_text, (sidebar_x, 150))
        score_value = self.font.render(str(self.score), True, WHITE)
        self.screen.blit(score_value, (sidebar_x, 180))

        # Level
        level_text = self.font.render("Level:", True, WHITE)
        self.screen.blit(level_text, (sidebar_x, 230))
        level_value = self.font.render(str(self.level), True, WHITE)
        self.screen.blit(level_value, (sidebar_x, 260))

        # Lines
        lines_text = self.font.render("Lines:", True, WHITE)
        self.screen.blit(lines_text, (sidebar_x, 310))
        lines_value = self.font.render(str(self.lines_cleared), True, WHITE)
        self.screen.blit(lines_value, (sidebar_x, 340))

        # Controls help
        controls = [
            "Controls:",
            "A/D or ←/→ Move",
            "S or ↓ Soft drop",
            "W or ↑ Rotate",
            "Space Hard drop",
            "P Pause",
            "R Restart",
        ]
        for i, text in enumerate(controls):
            ctrl_text = self.small_font.render(text, True, GRAY)
            self.screen.blit(ctrl_text, (sidebar_x, 420 + i * 22))

        # Game over or paused overlay
        if self.game_over:
            self.draw_overlay("GAME OVER", "Press R to restart")
        elif self.paused:
            self.draw_overlay("PAUSED", "Press P to continue")

        pygame.display.flip()

    def draw_block(self, x, y, color):
        """Draw a single block."""
        rect = pygame.Rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1)
        pygame.draw.rect(self.screen, color, rect)
        # Highlight
        pygame.draw.line(self.screen, WHITE, rect.topleft, rect.topright, 1)
        pygame.draw.line(self.screen, WHITE, rect.topleft, rect.bottomleft, 1)

    def draw_overlay(self, title, subtitle):
        """Draw game over or pause overlay."""
        overlay = pygame.Surface((COLS * CELL_SIZE, WINDOW_HEIGHT))
        overlay.fill(BLACK)
        overlay.set_alpha(180)
        self.screen.blit(overlay, (0, 0))

        title_text = self.font.render(title, True, WHITE)
        title_rect = title_text.get_rect(center=(COLS * CELL_SIZE // 2, WINDOW_HEIGHT // 2 - 20))
        self.screen.blit(title_text, title_rect)

        sub_text = self.small_font.render(subtitle, True, GRAY)
        sub_rect = sub_text.get_rect(center=(COLS * CELL_SIZE // 2, WINDOW_HEIGHT // 2 + 20))
        self.screen.blit(sub_text, sub_rect)

    def run(self):
        """Main game loop."""
        running = True

        # Enable key repeat for better responsiveness
        pygame.key.set_repeat(170, 50)

        while running:
            dt = self.clock.tick(60)

            # Handle events
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False

                # Mouse click to ensure window focus
                if event.type == pygame.MOUSEBUTTONDOWN:
                    pygame.event.set_grab(False)

                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_r:
                        self.reset_game()
                    elif event.key == pygame.K_p:
                        self.paused = not self.paused

                    if not self.game_over and not self.paused:
                        # Arrow keys
                        if event.key == pygame.K_LEFT or event.key == pygame.K_a:
                            self.move(-1, 0)
                        elif event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                            self.move(1, 0)
                        elif event.key == pygame.K_DOWN or event.key == pygame.K_s:
                            if self.move(0, 1):
                                self.score += 1
                        elif event.key == pygame.K_UP or event.key == pygame.K_w:
                            self.rotate()
                        elif event.key == pygame.K_SPACE:
                            self.hard_drop()

            # Auto drop
            if not self.game_over and not self.paused:
                self.drop_time += dt
                if self.drop_time >= self.drop_interval:
                    self.drop_time = 0
                    if not self.move(0, 1):
                        self.lock_piece()

            self.draw()

        pygame.quit()


if __name__ == "__main__":
    game = Tetris()
    game.run()
