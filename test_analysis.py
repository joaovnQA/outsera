import os
import json
import subprocess
import asyncio
import openai
from fpdf import FPDF
# Diretório onde os testes Cypress estão localizados
TESTS_FOLDER = "./joavn-api/src/test/integration/"

# Diretório onde o relatório será salvo
OUTPUT_FOLDER = "./joavn-api/src/test/integration/cypress/e2e/api"
REPORT_PATH = f"{OUTPUT_FOLDER}/relatorio_testes.pdf"

# OpenAI API Key (se necessário)
openai.api_key =""

def is_cypress_installed():
    """Verifica se o Cypress está instalado e acessível."""
    try:
        subprocess.run(["npx", "cypress", "-v"], capture_output=True, text=True, check=True)
        return True
    except subprocess.CalledProcessError:
        return False
    except FileNotFoundError:
        return False

def run_cypress_tests():
    """Executa os testes do Cypress no diretório correto e captura os resultados."""
    print("🔄 Executando testes do Cypress...")

    # Verifica se o Cypress está instalado
    if not is_cypress_installed():
        print("❌ Cypress não encontrado! Certifique-se de que ele está instalado via `npm install cypress --save-dev`.")
        return None

    result_file = f"{OUTPUT_FOLDER}/cypress_results.json"
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    command = ["npx", "cypress", "run", "--reporter", "json"]

    try:
        # Executa o Cypress no diretório correto e captura a saída
        result = subprocess.run(
            command,
            cwd=os.path.abspath(TESTS_FOLDER),  # Caminho absoluto evita erro de diretório
            capture_output=True,
            text=True,
            check=True
        )

        # Salva a saída JSON no arquivo de resultados
        with open(result_file, "w", encoding="utf-8") as file:
            file.write(result.stdout)

        print("✅ Testes Cypress executados com sucesso.")
        return result_file

    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao executar Cypress: {e.stderr}")
        return None
    except FileNotFoundError:
        print("❌ Erro: Cypress não encontrado no sistema.")
        return None

async def main():
    """Executa os testes, analisa os resultados e gera o relatório final."""
    result_file = run_cypress_tests()
    if not result_file:
        print("❌ Cypress falhou. Abortando geração do relatório.")
        return

    print("✅ Processo concluído com sucesso.")

if __name__ == "__main__":
    asyncio.run(main())
