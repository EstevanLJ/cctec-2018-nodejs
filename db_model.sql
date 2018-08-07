CREATE TABLE produto (
    id     INTEGER       PRIMARY KEY AUTOINCREMENT
                         NOT NULL,
    codigo VARCHAR (45)  UNIQUE
                         NOT NULL,
    nome   VARCHAR (255) UNIQUE
                         NOT NULL
);
