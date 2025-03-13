const fs = require("fs");
const readline = require("readline");

const filePath = "resultados.json";

async function processarArquivo() {
  console.log("📥 Lendo o arquivo JSON...");

  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let totalRequisicoes = 0;
  let totalFalhas = 0;
  let tempos = [];
  let temposConexao = [];
  let temposEspera = [];
  let dadosEnviados = 0;
  let dadosRecebidos = 0;

  let linhasProcessadas = 0;

  for await (const linha of rl) {
    try {
      const item = JSON.parse(linha.trim());

      if (item.metric === "http_reqs" && item.data?.value) {
        totalRequisicoes += Number(item.data.value);
      }
      if (item.metric === "http_req_failed" && item.data?.value) {
        totalFalhas += Number(item.data.value);
      }
      if (item.metric === "http_req_duration" && item.data?.value) {
        tempos.push(Number(item.data.value));
      }
      if (item.metric === "http_req_connecting" && item.data?.value) {
        temposConexao.push(Number(item.data.value));
      }
      if (item.metric === "http_req_waiting" && item.data?.value) {
        temposEspera.push(Number(item.data.value));
      }
      if (item.metric === "data_sent" && item.data?.value) {
        dadosEnviados += Number(item.data.value);
      }
      if (item.metric === "data_received" && item.data?.value) {
        dadosRecebidos += Number(item.data.value);
      }

      linhasProcessadas++;
      if (linhasProcessadas % 100000 === 0) {
        console.log(`🔹 Processadas ${linhasProcessadas} linhas...`);
      }
    } catch (error) {
      console.error(`⚠️ Erro ao processar linha: ${error.message}`);
    }
  }

  const calcularPercentil = (arr, percentil) => {
    if (arr.length === 0) return 0;
    arr.sort((a, b) => a - b);
    const index = Math.floor((percentil / 100) * arr.length);
    return arr[index];
  };

  const tempoMedio = tempos.length
    ? tempos.reduce((a, b) => a + b, 0) / tempos.length
    : 0;
  const tempoMaximo = tempos.length ? Math.max(...tempos) : 0;
  const erroRate = totalRequisicoes
    ? ((totalFalhas / totalRequisicoes) * 100).toFixed(2)
    : 0;

  const p50 = calcularPercentil(tempos, 50);
  const p90 = calcularPercentil(tempos, 90);
  const p95 = calcularPercentil(tempos, 95);
  const p99 = calcularPercentil(tempos, 99);

  console.log("\n📊 === RELATÓRIO DE TESTE K6 === 📊");
  console.log(`🔹 Total de requisições: ${totalRequisicoes}`);
  console.log(`❌ Falhas: ${totalFalhas} (${erroRate}% de erro)`);
  console.log(`⏳ Tempo médio de resposta: ${tempoMedio.toFixed(2)} ms`);
  console.log(`🚀 Tempo máximo de resposta: ${tempoMaximo.toFixed(2)} ms`);
  console.log(`📌 Percentis de tempo de resposta:`);
  console.log(`   P50: ${p50.toFixed(2)} ms`);
  console.log(`   P90: ${p90.toFixed(2)} ms`);
  console.log(`   P95: ${p95.toFixed(2)} ms`);
  console.log(`   P99: ${p99.toFixed(2)} ms`);
  console.log(
    `🔌 Tempo médio de conexão: ${
      temposConexao.length
        ? (
            temposConexao.reduce((a, b) => a + b, 0) / temposConexao.length
          ).toFixed(2)
        : 0
    } ms`
  );
  console.log(
    `⌛ Tempo médio de espera: ${
      temposEspera.length
        ? (
            temposEspera.reduce((a, b) => a + b, 0) / temposEspera.length
          ).toFixed(2)
        : 0
    } ms`
  );
  console.log(`📊 Dados enviados: ${(dadosEnviados / 1024).toFixed(2)} KB`);
  console.log(`📩 Dados recebidos: ${(dadosRecebidos / 1024).toFixed(2)} KB`);
  console.log("=================================\n");
}

processarArquivo();
