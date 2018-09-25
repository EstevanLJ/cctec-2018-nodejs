DROP TABLE IF EXISTS produto;
CREATE TABLE produto (
    id     INTEGER       PRIMARY KEY AUTOINCREMENT
                         NOT NULL,
    codigo VARCHAR (45)  UNIQUE
                         NOT NULL,
    nome   VARCHAR (255) UNIQUE
                         NOT NULL
);

DROP TABLE IF EXISTS venda;
CREATE TABLE venda (
    id              INTEGER     PRIMARY KEY AUTOINCREMENT
                                NOT NULL,
    nome_cliente    VARCHAR (255)
                                NOT NULL,
    data            DATETIME    NOT NULL
                                DEFAULT (CURRENT_TIMESTAMP)
);

DROP TABLE IF EXISTS venda_produto;
CREATE TABLE venda_produto (
    id              INTEGER         PRIMARY KEY AUTOINCREMENT
                                    NOT NULL,
    venda_id        INTEGER         REFERENCES venda (id) 
                                    NOT NULL,
    produto_id      INTEGER         REFERENCES produto (id) 
                                    NOT NULL,
    quantidade      DECIMAL (8, 3)  NOT NULL,
    valor_unitario  DECIMAL (8, 3)  NOT NULL,
    UNIQUE (
        venda_id,
        produto_id
    )
);

INSERT INTO produto (codigo, nome) VALUES ('1', 'Produto Exemplo 01');
INSERT INTO produto (codigo, nome) VALUES ('2', 'Produto Exemplo 02');
INSERT INTO produto (codigo, nome) VALUES ('3', 'Produto Exemplo 03');
INSERT INTO produto (codigo, nome) VALUES ('4', 'Produto Exemplo 04');
INSERT INTO produto (codigo, nome) VALUES ('5', 'Produto Exemplo 05');
INSERT INTO produto (codigo, nome) VALUES ('6', 'Produto Exemplo 06');
INSERT INTO produto (codigo, nome) VALUES ('7', 'Produto Exemplo 07');
INSERT INTO produto (codigo, nome) VALUES ('8', 'Produto Exemplo 08');
INSERT INTO produto (codigo, nome) VALUES ('9', 'Produto Exemplo 09');

INSERT INTO venda (nome_cliente) VALUES ('João');
INSERT INTO venda_produto (venda_id, produto_id, quantidade, valor_unitario) VALUES (1, 1, 3, 1.50);
INSERT INTO venda_produto (venda_id, produto_id, quantidade, valor_unitario) VALUES (1, 3, 5, 2.90);
INSERT INTO venda_produto (venda_id, produto_id, quantidade, valor_unitario) VALUES (1, 5, 7, 10.00);

INSERT INTO venda (nome_cliente) VALUES ('Maria');
INSERT INTO venda_produto (venda_id, produto_id, quantidade, valor_unitario) VALUES (2, 2, 9, 31.50);
INSERT INTO venda_produto (venda_id, produto_id, quantidade, valor_unitario) VALUES (2, 4, 5, 19.10);
INSERT INTO venda_produto (venda_id, produto_id, quantidade, valor_unitario) VALUES (2, 6, 7, 14.37);

