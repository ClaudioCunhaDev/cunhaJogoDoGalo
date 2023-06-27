import React, { useState } from "react";
import {
  adicionarJogada,
  verificarFimDoJogo,
  verificarVencedor,
} from "./Logica";
import styles from "../styles/JogoDoGalo.module.css";

export const JogoDoGalo = () => {
  const jogoVazio = {
    tabuleiro: [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    jogadorAtual: "🐈‍⬛",
  };

  const [jogo, setJogo] = useState(jogoVazio);

  const handleReset = () => {
    setJogo(jogoVazio);
  };

  const handleJogada = (line, cell) => {
    if (jogo.tabuleiro[line][cell] === " " && !verificarFimDoJogo(jogo)) {
      const novaJogada = adicionarJogada(jogo, jogo.jogadorAtual, line, cell);
      setJogo(novaJogada);
    }
  };

  return (
    <div className={styles.pai}>
      <div className={styles.textInicial}>
        <p>
          <span className={styles.alerta}>⚠️ Alerta:</span> Neste jogo é sempre
          apostado um ou outro jogador! ⚠️
        </p>
      </div>
      <hr />
      <div className={styles.textContent}>
        <p className={styles.frase}>Ganha e leva o teu inimigo👌</p>
        <div className={styles.text}>
          {verificarFimDoJogo(jogo) ? (
            <p>Jogo Terminado</p>
          ) : (
            <p>Jogador: {jogo.jogadorAtual}</p>
          )}
        </div>
        {verificarVencedor(jogo) !== undefined && (
          <div className={styles.textVencedor}>
            <p className={styles.vencedor}>
              Vencedor: {verificarVencedor(jogo)}
            </p>
            {verificarVencedor(jogo) === "🐈‍⬛" ? (
              <p className={styles.parabens}>
                Parabens 🐈‍⬛! Ganhaste uma soneca
              </p>
            ) : (
              <p className={styles.parabens}>
                Parabens 🛌! Ganhaste um gatinho
              </p>
            )}
          </div>
        )}
      </div>

      <div className={styles.org}>
        <div>
          <img src="../src/assets/cama.png" style={{ width: "100px" }} alt="" />
        </div>
        <div className={styles.linhas}>
          {jogo.tabuleiro.map((row, i) => (
            <div style={{ display: "flex" }}>
              {row.map((cell, j) => (
                <div onClick={() => handleJogada(i, j)} className={styles.casa}>
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <img src="../src/assets/gato.png" style={{ width: "100px" }} alt="" />
        </div>
      </div>
      <div className={styles.fixBtn}>
        <button className={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
