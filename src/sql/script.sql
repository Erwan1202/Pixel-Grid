CREATE TABLE IF NOT EXISTS users(
    id                SERIAL       PRIMARY KEY,
    username          VARCHAR(100) NOT NULL UNIQUE,
    password          VARCHAR(100) NOT NULL,
    birth_date        DATE         NOT NULL,
    is_banned         BOOLEAN      DEFAULT FALSE,
    role              VARCHAR(50)  DEFAULT 'user' CHECK (role IN ('admin', 'user')) NOT NULL,
    registration_date TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS canvases(
    id     SERIAL       PRIMARY KEY,
    name   VARCHAR(100) NOT NULL UNIQUE,
    width  INT          NOT NULL CHECK (width > 0),
    height INT          NOT NULL CHECK (height > 0)
);

CREATE TABLE IF NOT EXISTS pixels(
    id        SERIAL    PRIMARY KEY,
    x         INT       NOT NULL CHECK (x >= 0),
    y         INT       NOT NULL CHECK (y >= 0),
    color     CHAR(7)   NOT NULL,
    placed_by INT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    canvas_id INT       NOT NULL REFERENCES canvases(id) ON DELETE CASCADE,
);

CREATE TABLE IF NOT EXISTS bans(
    id         SERIAL    PRIMARY KEY,
    reason     TEXT      NOT NULL,
    user_id    INT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at DATE      NOT NULL
);
