import React, { useState } from "react";

// ─── DADOS ─────────────────────────────────────────────────────────────────────
const TURMAS = [
  { id: "Engenharia de Software",  nome: "ALEXANDRE AUGUSTO BRUNETTI",  aulas: 2, turma: "ENGSOFTW_40.SOF-1-N.2026.1", accent: "#6EE7B7" },
  { id: "Computação em Nuvem",  nome: "EDUARDO RODRIGUES SANT'ANA POPOVICI",  aulas: 2, turma: "COMNUARCLOU_40.SOF-1-N.2026.1", accent: "#A5B4FC" },
  { id: "Algoritmos e Lógica de Programação", nome: "LUIZ GUSTAVO FERREIRA DA SILVA TRUFILHO",   aulas: 4, turma: "ALLOPROG_80.SOF-1-N.2026.1", accent: "#FDE68A" },
  { id: "Ciência e Construção do Conhecimento", nome: "LUCIANA URBANO DOS SANTOS",   aulas: 4, turma: "CCCON_60.DD-CCCON-SOF-PRES.2026.1", accent: "#F9A8D4" },
  { id: "Cálculo Fundamental", nome: "THABATA CAROLINE MARTINS",   aulas: 2, turma: "CALFUN_40.SOF-1-N.2026.1", accent: "#93C5FD" },
  { id: "Technical English",  nome: "BÁRBARA HELENA FARIA FERREIRA",  aulas: 2, turma: "TECENG_40.SOF-1-N.2026.1", accent: "#D9F99D" },
];

const NOMES = [
  "Ana Beatriz Souza Lima","Bruno Henrique Costa","Carla Fernanda Oliveira",
  "Diego Martins Pereira","Eduarda Santos Rocha","Felipe Alves Mendes",
  "Gabriela Nunes Ferreira","Henrique Castro Silva","Isabela Moraes Teixeira",
  "João Pedro Gomes","Karen Lima Rodrigues","Lucas Viana Barbosa",
  "Mariana Dias Cardoso","Nicolas Ramos Pinto","Olivia Torres Nascimento",
  "Pedro Henrique Freitas","Quésia Araújo Ribeiro","Rafael Cunha Santos",
  "Sofia Lopes Melo","Thiago Batista Carvalho","Ursula Fonseca Azevedo",
  "Vinícius Medeiros Cruz","Wendy Almeida Campos","Xavier Brito Vieira",
  "Yasmin Ferreira Borges",
];

function gerarAlunos(turmaId) {
  const qtd = 18 + Math.floor(Math.random() * 7);
  return NOMES.slice(0, qtd).map((nome, i) => ({
    id: i + 1, nome,
    faltas: Math.floor(Math.random() * 14),
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nome)}&backgroundColor=1e293b&textColor=94a3b8&fontSize=36`,
    status: null,
    qtdFaltas: null,
  }));
}

function hoje() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });
}

// ─── GLOBAL ────────────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    body { background: #F4F4F4; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(.96); }
      to   { opacity: 1; transform: scale(1); }
    }

    .turma-card {
      animation: fadeUp .35s ease both;
      transition: background .18s, border-color .18s, transform .18s, box-shadow .18s !important;
    }
    .turma-card:hover {
      background: #FFFFFF !important;
      border-color: var(--accent) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 24px rgba(27,58,107,.10) !important;
    }
    .turma-card:hover .turma-arrow { opacity: 1 !important; }

    .aluno-row { transition: background .15s; }
    .aluno-row:hover { background: #F0F4FA !important; }

    .btn-p, .btn-f { transition: all .14s ease !important; }
    .btn-p:hover { background: rgba(240,165,0,.12) !important; border-color: #F0A500 !important; color: #B07800 !important; }
    .btn-f:hover { background: rgba(220,38,38,.08) !important; border-color: #EF4444 !important; color: #DC2626 !important; }

    .btn-confirmar:hover { opacity: .88; transform: translateY(-1px); }
    .btn-confirmar { transition: opacity .15s, transform .15s; }
    .btn-voltar-edit:hover { background: #EEF2F8 !important; }
    .btn-voltar-edit { transition: background .15s; }

    .dropdown-opt { transition: all .13s; }
    .dropdown-opt:hover { background: rgba(27,58,107,.06) !important; }
  `}</style>
);

// ─── TELA: SELEÇÃO DE TURMAS ───────────────────────────────────────────────────
function TelaTurmas({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F4F4F4", fontFamily: "'Geist', sans-serif", color: "#1B3A6B" }}>
      <GlobalStyle />

      {/* Topo */}
      <div style={{ padding: "56px 40px 0", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6, background: "#1B3A6B",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: "#F0A500",
          }}><img src="/public/book-key.svg" alt="Icon" style={{ width: 16, height: 16 }} /></div>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", letterSpacing: 1, textTransform: "uppercase" }}>
            Diário · Sistema de Chamada
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, color: "#1B3A6B", marginTop: 24 }}>
          Selecione a turma
        </h1>
        <p style={{ fontSize: 14, color: "#6B7280", marginTop: 6 }}>
          {hoje()}
        </p>

        <div style={{ width: 32, height: 2, background: "#F0A500", margin: "28px 0" }} />
      </div>

      {/* Grid de turmas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 10,
        padding: "0 40px 60px",
        maxWidth: 860,
        margin: "0 auto",
      }}>
        {TURMAS.map((t, i) => (
          <button
            key={t.id}
            className="turma-card"
            style={{
              "--accent": t.accent,
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 12,
              padding: "22px 20px",
              cursor: "pointer",
              textAlign: "left",
              animationDelay: `${i * 55}ms`,
              boxShadow: "0 1px 4px rgba(27,58,107,.06)",
            }}
            onClick={() => onSelect(t)}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1, color: t.accent, lineHeight: 1 }}>
                {t.id}
              </span>
              <span className="turma-arrow" style={{ fontSize: 14, color: "#94A3B8", opacity: 0, transition: "opacity .18s" }}>↗</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#1B3A6B", margin: "8px 0 14px" }}>
              {t.nome}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[t.turma, `${t.aulas} aulas`].map(tag => (
                <span key={tag} style={{
                  fontSize: 10, fontWeight: 500, letterSpacing: .3,
                  background: "#F0F4FA", color: "#1E4D8C",
                  borderRadius: 4, padding: "3px 8px", border: "1px solid #DBEAFE",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SELECT DE FALTAS ──────────────────────────────────────────────────────────
function SelectFaltas({ maxFaltas, valor, onChange }) {
  return (
    <select
      value={valor || 1}
      onChange={e => onChange(Number(e.target.value))}
      style={{
        width: 52,
        background: "#FFF7E6",
        border: "1px solid #F0A50060",
        borderRadius: 6,
        color: "#B07800",
        fontSize: 11, fontWeight: 600,
        fontFamily: "'Geist', sans-serif",
        padding: "0 4px",
        height: 24,
        cursor: "pointer",
        outline: "none",
        letterSpacing: .3,
      }}
    >
      {Array.from({ length: maxFaltas }, (_, i) => i + 1).map(n => (
        <option key={n} value={n}>{n}x</option>
      ))}
    </select>
  );
}

// ─── CARD DO ALUNO ─────────────────────────────────────────────────────────────
function AlunoCard({ aluno, turma, onChange, index }) {
  const ePresente = aluno.status === "presente";
  const eFalta    = aluno.status === "falta";
  const totalFaltasHoje = eFalta ? (aluno.qtdFaltas || 0) : 0;

  return (
    <div style={{ borderBottom: "1px solid #E2E8F0", animation: `fadeUp .3s ease ${index * 25}ms both` }}>
      <div className="aluno-row" style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "11px 20px",
        background: ePresente ? "rgba(240,165,0,.06)" : eFalta ? "rgba(220,38,38,.04)" : "transparent",
      }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img src={aluno.avatar} alt="" style={{
            width: 38, height: 38, borderRadius: "50%",
            border: `1.5px solid ${ePresente ? "#F0A500" : eFalta ? "#EF4444" : "#E2E8F0"}`,
            display: "block",
          }} />
          {aluno.status && (
            <div style={{
              position: "absolute", bottom: -1, right: -1,
              width: 10, height: 10, borderRadius: "50%",
              background: ePresente ? "#F0A500" : "#EF4444",
              border: "2px solid #F4F4F4",
            }} />
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 500,
            color: ePresente ? "#1B3A6B" : eFalta ? "#9CA3AF" : "#374151",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            textDecoration: eFalta ? "line-through" : "none",
            textDecorationColor: "rgba(220,38,38,.4)",
          }}>
            {aluno.nome}
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2, display: "flex", gap: 6, alignItems: "center" }}>
            <span>{aluno.faltas + totalFaltasHoje} faltas</span>
            {eFalta && aluno.qtdFaltas && (
              <span style={{ color: "rgba(220,38,38,.6)", fontSize: 10 }}>+{aluno.qtdFaltas} hoje</span>
            )}
          </div>
        </div>

        {/* Botões */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="btn-p"
              onClick={() => onChange({ status: "presente", qtdFaltas: null })}
              style={{
                width: 68, height: 32, borderRadius: 6, cursor: "pointer",
                fontFamily: "'Geist', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: .5,
                border: `1px solid ${ePresente ? "#3DD68C" : "#E2E8F0"}`,
                background: ePresente ? "rgba(110, 231, 183, .12)" : "transparent",
                color: ePresente ? "#6EE7B7" : "#9CA3AF",
              }}>
              PRESENTE
            </button>
            <button className="btn-f"
              onClick={() => onChange({ status: "falta", qtdFaltas: aluno.qtdFaltas || 1 })}
              style={{
                width: 52, height: 32, borderRadius: 6, cursor: "pointer",
                fontFamily: "'Geist', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: .5,
                border: `1px solid ${eFalta ? "#EF4444" : "#E2E8F0"}`,
                background: eFalta ? "rgba(220,38,38,.08)" : "transparent",
                color: eFalta ? "#DC2626" : "#9CA3AF",
              }}>
              FALTA
            </button>
          </div>
          {eFalta && turma.aulas > 1 && (
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              <SelectFaltas
                maxFaltas={turma.aulas}
                valor={aluno.qtdFaltas}
                onChange={n => onChange({ status: "falta", qtdFaltas: n })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ turma, totalPresente, totalFalta, totalPendente, total, onFechar, onVoltar }) {
  const [saindo, setSaindo] = useState(false);
  const pct = Math.round((totalPresente / total) * 100) || 0;

  function fechar(cb) {
    setSaindo(true);
    setTimeout(cb, 240);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(27,58,107,.35)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
      animation: saindo ? "none" : "fadeIn .2s ease",
      opacity: saindo ? 0 : 1, transition: "opacity .24s",
    }}>
      <div style={{
        background: "#FFFFFF", borderRadius: 16,
        border: "1px solid #E2E8F0",
        width: "100%", maxWidth: 400,
        overflow: "hidden",
        animation: saindo ? "none" : "scaleIn .22s ease",
        transform: saindo ? "scale(.97)" : "scale(1)",
        transition: "transform .24s",
        boxShadow: "0 40px 80px rgba(27,58,107,.18)",
      }}>
        {/* Barra de progresso topo */}
        <div style={{ height: 3, background: "#E2E8F0" }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: `linear-gradient(90deg, ${turma.accent}88, ${turma.accent})`,
            transition: "width 1s ease",
          }} />
        </div>

        <div style={{ padding: "32px 28px 24px" }}>
          {/* Topo do modal */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                Chamada registrada
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1B3A6B", letterSpacing: -.5 }}>
                {turma.nome}
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3, textTransform: "capitalize" }}>
                {hoje()}
              </div>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              border: `1px solid ${turma.accent}40`,
              background: `${turma.accent}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: turma.accent,
            }}>✓</div>
          </div>

          {/* Estatísticas */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
            {[
              { label: "Presentes", val: totalPresente, color: "#F0A500" },
              { label: "Faltaram",  val: totalFalta,    color: "#DC2626" },
              { label: "Pendentes", val: totalPendente, color: "#9CA3AF" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{
                background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0",
                padding: "12px 14px",
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1, letterSpacing: -1 }}>{val}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 4, fontWeight: 500, letterSpacing: .3, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Aviso pendentes */}
          {totalPendente > 0 && (
            <div style={{
              background: "rgba(240,165,0,.06)", border: "1px solid rgba(240,165,0,.2)",
              borderRadius: 8, padding: "10px 14px", marginBottom: 16,
              fontSize: 12, color: "#B07800", lineHeight: 1.5,
            }}>
              {totalPendente} aluno{totalPendente > 1 ? "s" : ""} ainda sem registro.
            </div>
          )}

          {/* Botões */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button className="btn-voltar-edit"
              onClick={() => fechar(onFechar)}
              style={{
                background: "#F8FAFC", border: "1px solid #E2E8F0",
                borderRadius: 8, padding: "11px", cursor: "pointer",
                color: "#6B7280", fontSize: 12, fontWeight: 600,
                fontFamily: "'Geist', sans-serif", letterSpacing: .3,
              }}>
              Continuar
            </button>
            <button className="btn-confirmar"
              onClick={() => fechar(onVoltar)}
              style={{
                background: turma.accent, border: "none",
                borderRadius: 8, padding: "11px", cursor: "pointer",
                color: turma.accent === "#F0A500" ? "#1B3A6B" : "#FFFFFF",
                fontSize: 12, fontWeight: 700,
                fontFamily: "'Geist', sans-serif", letterSpacing: .3,
              }}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TELA DE CHAMADA ───────────────────────────────────────────────────────────
function TelaChamada({ turma, onVoltar }) {
  const [alunos, setAlunos] = useState(() => gerarAlunos(turma.id));
  const [modal, setModal] = useState(false);

  const atualizar = (id, patch) =>
    setAlunos(prev => prev.map(a => a.id === id ? { ...a, ...patch } : a));

  const totalPresente = alunos.filter(a => a.status === "presente").length;
  const totalFalta    = alunos.filter(a => a.status === "falta").length;
  const totalPendente = alunos.filter(a => a.status === null).length;
  const progresso     = Math.round(((totalPresente + totalFalta) / alunos.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#F4F4F4", fontFamily: "'Geist', sans-serif", color: "#1B3A6B" }}>
      <GlobalStyle />

      {modal && (
        <Modal
          turma={turma}
          totalPresente={totalPresente} totalFalta={totalFalta}
          totalPendente={totalPendente} total={alunos.length}
          onFechar={() => setModal(false)}
          onVoltar={onVoltar}
        />
      )}

      {/* HEADER */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "#FFFFFFee", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0 1px 8px rgba(27,58,107,.06)",
      }}>
        {/* Linha de progresso */}
        <div style={{ height: 3, background: "#E2E8F0" }}>
          <div style={{
            height: "100%", width: `${progresso}%`,
            background: turma.accent,
            transition: "width .5s ease",
          }} />
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 10, padding: "12px 20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onVoltar} style={{
              background: "transparent", border: "1px solid #E2E8F0",
              borderRadius: 6, padding: "5px 12px",
              color: "#6B7280", fontSize: 12, fontWeight: 500,
              cursor: "pointer", fontFamily: "'Geist', sans-serif",
              letterSpacing: .3,
            }}>← Turmas</button>

            <div style={{ width: 1, height: 16, background: "#E2E8F0" }} />

            <button onClick={() => setAlunos(p => p.map(a => ({ ...a, status: "presente", qtdFaltas: null })))}
              style={{
                background: "transparent", border: "1px solid #6EE7B7",borderRadius: 6,
                color: "#9CA3AF", fontSize: 11, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Geist', sans-serif",
                letterSpacing: .5, textTransform: "uppercase", padding: "5px 8px",
              }}>
              Presença Para Todos
            </button>
            <button onClick={() => setAlunos(p => p.map(a => ({ ...a, status: "falta", qtdFaltas: turma.aulas })))}
              style={{
                background: "transparent", border: "1px solid #FCA5A5",borderRadius: 6,
                color: "#9CA3AF", fontSize: 11, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Geist', sans-serif",
                letterSpacing: .5, textTransform: "uppercase", padding: "5px 8px",
              }}>
              Falta Para Todos
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: turma.accent }}>
                {turma.nome}
              </div>
              <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "capitalize", marginTop: 1 }}>
                {hoje()}
              </div>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 600, color: "#1E4D8C",
              border: "1px solid #DBEAFE",
              background: "#EEF4FF",
              borderRadius: 4,
              padding: "3px 8px", letterSpacing: .5,
            }}>
              {progresso}%
            </div>
          </div>
        </div>
      </div>

      {/* LISTA */}
      <div style={{ maxWidth: 720, margin: "0 auto", background: "#FFFFFF", borderRadius: "0 0 12px 12px", boxShadow: "0 2px 12px rgba(27,58,107,.06)" }}>
        {alunos.map((aluno, i) => (
          <AlunoCard key={aluno.id} aluno={aluno} turma={turma} index={i}
            onChange={patch => atualizar(aluno.id, patch)} />
        ))}
      </div>

      {/* RODAPÉ */}
      <div style={{
        maxWidth: 720, margin: "0 auto",
        background: "#FFFFFF",
        borderTop: "1px solid #E2E8F0",
        borderRadius: "0 0 12px 12px",
        padding: "20px 20px 32px",
        boxShadow: "0 4px 16px rgba(27,58,107,.08)",
      }}>
        {/* Resumo inline */}
        <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
          {[
            { label: "Presentes", val: totalPresente, color: "#6EE7B7" },
            { label: "Faltaram",  val: totalFalta,    color: "#FCA5A5" },
            { label: "Pendentes", val: totalPendente, color: "#9CA3AF" },
            { label: "Total",     val: alunos.length, color: "#1E4D8C" },
          ].map(({ label, val, color }) => (
            <div key={label}>
              <div style={{ fontSize: 20, fontWeight: 700, color, letterSpacing: -1 }}>{val}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500, letterSpacing: .4, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Botão finalizar */}
        <button className="btn-confirmar"
          onClick={() => setModal(true)}
          style={{
            width: "100%", padding: "14px",
            background: "#1B3A6B",
            border: "none", borderRadius: 8,
            color: "#FFFFFF", fontSize: 13, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Geist', sans-serif",
            letterSpacing: .5,
          }}>
          Finalizar Chamada
        </button>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [turma, setTurma] = useState(null);
  return turma
    ? <TelaChamada turma={turma} onVoltar={() => setTurma(null)} />
    : <TelaTurmas onSelect={setTurma} />;
}
