CREATE TABLE produto (
    id     INTEGER       PRIMARY KEY AUTOINCREMENT
                         NOT NULL,
    codigo VARCHAR (45)  UNIQUE
                         NOT NULL,
    nome   VARCHAR (255) UNIQUE
                         NOT NULL
);

CREATE TABLE venda (
    id         INTEGER  PRIMARY KEY AUTOINCREMENT
                        NOT NULL,
    data       DATETIME NOT NULL,
    finalizada BOOLEAN  NOT NULL
                        DEFAULT (0) 
);

CREATE TABLE venda_produto (
    id         INTEGER        PRIMARY KEY AUTOINCREMENT
                              NOT NULL,
    venda_id   INTEGER        REFERENCES venda (id) 
                              NOT NULL,
    produto_id INTEGER        REFERENCES produto (id) 
                              NOT NULL,
    quantidade DECIMAL (8, 3) NOT NULL,
    UNIQUE (
        venda_id,
        produto_id
    )
);
