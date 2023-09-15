-- CreateEnum
CREATE TYPE "tipocampeonato" AS ENUM ('Fundo', 'MeioFundo', 'Velocidade', 'Filhotes');

-- CreateEnum
CREATE TYPE "perfil" AS ENUM ('Socio', 'Dirigente', 'Admin');

-- CreateEnum
CREATE TYPE "sexoPombo" AS ENUM ('Femea', 'Macho', 'Filhote');

-- CreateTable
CREATE TABLE "credencial" (
    "id" SERIAL NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "email" VARCHAR(250) NOT NULL,
    "senha" TEXT NOT NULL,
    "prazo_licenca" INTEGER DEFAULT 7,
    "token" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "id_cred" INTEGER NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(250) NOT NULL,
    "cpf_cnpj" VARCHAR(20) NOT NULL,
    "telefone" VARCHAR(20),
    "endereco" VARCHAR(250),
    "num_endereco" VARCHAR(10),
    "complemento" TEXT,
    "bairro" VARCHAR(100),
    "cidade" VARCHAR(60),
    "uf" CHAR(2),
    "cep" VARCHAR(9),
    "pais" VARCHAR(60),
    "latitude_casa" TEXT,
    "longitude_casa" TEXT,
    "latitude_pombal" TEXT,
    "longitude_pombal" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "herarquia" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "perfil" "perfil" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pombo" (
    "id" SERIAL NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "anilha" VARCHAR(50) NOT NULL,
    "sexo" "sexoPombo" NOT NULL,
    "cor" VARCHAR(30) NOT NULL,
    "dono" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clube" (
    "id" SERIAL NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(20),
    "cidade" VARCHAR(60) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "pais" VARCHAR(60) NOT NULL,
    "federacao_id" INTEGER NOT NULL,
    "usuario_dirigente" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socio_clube" (
    "id" SERIAL NOT NULL,
    "usario_id" INTEGER NOT NULL,
    "clube_id" INTEGER NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "federacao" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "telefone" VARCHAR(20),
    "cidade" VARCHAR(60) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "pais" VARCHAR(60) NOT NULL,
    "presidente" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campeonato" (
    "id" SERIAL NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "nome" VARCHAR(250) NOT NULL,
    "categoria" "tipocampeonato" NOT NULL,
    "usuario_criador" INTEGER NOT NULL,
    "clube_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clube_campeonato" (
    "id" SERIAL NOT NULL,
    "campeonato_id" INTEGER NOT NULL,
    "socio_id" INTEGER NOT NULL,
    "clube_id" INTEGER NOT NULL,
    "prova_id" INTEGER NOT NULL,
    "pombo_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provas" (
    "id" SERIAL NOT NULL,
    "situacao" BOOLEAN NOT NULL DEFAULT true,
    "campeonato_id" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(60) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "pais" VARCHAR(60) NOT NULL,
    "data_hora_solta" TIMESTAMP(3),
    "latitude_solta" VARCHAR(100),
    "longitude_solta" VARCHAR(100),
    "prova_encerrada" BOOLEAN NOT NULL DEFAULT false,
    "usuario_criacao" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provas_lancamento" (
    "id" SERIAL NOT NULL,
    "prova_id" INTEGER NOT NULL,
    "pombo_id" INTEGER NOT NULL,
    "data_hora_chegada" TIMESTAMP(3) NOT NULL,
    "latitude_chegada" VARCHAR(100) NOT NULL,
    "longitude_chegada" VARCHAR(100) NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provas_resultado" (
    "id" SERIAL NOT NULL,
    "prova_id" INTEGER NOT NULL,
    "prova_lanc_id" INTEGER NOT NULL,
    "distancia_percorrida" DOUBLE PRECISION NOT NULL,
    "tempo_prova" DOUBLE PRECISION NOT NULL,
    "velocidade_media" DOUBLE PRECISION NOT NULL,
    "pombo_id" INTEGER NOT NULL,
    "pts" INTEGER DEFAULT 0,
    "posicao" INTEGER,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tempo_morto" (
    "id" SERIAL NOT NULL,
    "tempo_morto_inicio" TIMESTAMP(3) NOT NULL,
    "tempo_morto_final" TIMESTAMP(3) NOT NULL,
    "prova_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "clube_id" INTEGER,
    "vencimento" TIMESTAMP(3),
    "vencido" BOOLEAN NOT NULL DEFAULT false,
    "tipo_documento" VARCHAR(250),
    "url" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credencial.email_unique" ON "credencial"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario.id_cred_unique" ON "usuario"("id_cred");

-- CreateIndex
CREATE UNIQUE INDEX "usuario.cpf_cnpj_unique" ON "usuario"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "clube.usuario_dirigente_unique" ON "clube"("usuario_dirigente");

-- CreateIndex
CREATE UNIQUE INDEX "clube_campeonato.campeonato_id_clube_id_pombo_id_prova_id_socio_id_unique" ON "clube_campeonato"("campeonato_id", "clube_id", "pombo_id", "prova_id", "socio_id");

-- CreateIndex
CREATE UNIQUE INDEX "provas_lancamento.prova_id_pombo_id_unique" ON "provas_lancamento"("prova_id", "pombo_id");

-- AddForeignKey
ALTER TABLE "usuario" ADD FOREIGN KEY ("id_cred") REFERENCES "credencial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "herarquia" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pombo" ADD FOREIGN KEY ("dono") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clube" ADD FOREIGN KEY ("usuario_dirigente") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clube" ADD FOREIGN KEY ("federacao_id") REFERENCES "federacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socio_clube" ADD FOREIGN KEY ("clube_id") REFERENCES "clube"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socio_clube" ADD FOREIGN KEY ("usario_id") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "federacao" ADD FOREIGN KEY ("presidente") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campeonato" ADD FOREIGN KEY ("usuario_criador") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campeonato" ADD FOREIGN KEY ("clube_id") REFERENCES "clube"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clube_campeonato" ADD FOREIGN KEY ("clube_id") REFERENCES "clube"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clube_campeonato" ADD FOREIGN KEY ("pombo_id") REFERENCES "pombo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clube_campeonato" ADD FOREIGN KEY ("prova_id") REFERENCES "provas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clube_campeonato" ADD FOREIGN KEY ("campeonato_id") REFERENCES "campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clube_campeonato" ADD FOREIGN KEY ("socio_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas" ADD FOREIGN KEY ("campeonato_id") REFERENCES "campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas" ADD FOREIGN KEY ("usuario_criacao") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_lancamento" ADD FOREIGN KEY ("pombo_id") REFERENCES "pombo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_lancamento" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_lancamento" ADD FOREIGN KEY ("prova_id") REFERENCES "provas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_resultado" ADD FOREIGN KEY ("prova_lanc_id") REFERENCES "provas_lancamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_resultado" ADD FOREIGN KEY ("prova_id") REFERENCES "provas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas_resultado" ADD FOREIGN KEY ("pombo_id") REFERENCES "pombo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tempo_morto" ADD FOREIGN KEY ("prova_id") REFERENCES "provas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_cred") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD FOREIGN KEY ("clube_id") REFERENCES "clube"("id") ON DELETE SET NULL ON UPDATE CASCADE;
