#include <iostream>
#include <string>
#include <vector>
#include <limits>
#include <algorithm>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <cmath>

using namespace std;

struct Produto {
    string nome;
    double quantidade;
    double valor;
};

struct ItemVenda {
    string nome;
    double quantidade;
    double valorUnitario;
    double valorTotal;
};

void limparBuffer() {
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

double lerNumeroValido(const string& mensagem) {
    double numero;
    while (true) {
        cout << mensagem;
        if (cin >> numero && numero > 0) {
            limparBuffer();
            return numero;
        } else {
            cout << "Entrada inválida. Por favor, insira um número positivo." << endl;
            limparBuffer();
        }
    }
}

vector<Produto> carregarProdutos() {
    vector<Produto> produtos;
    ifstream arquivo("produtos.txt");
    if (arquivo.is_open()) {
        string linha;
        while (getline(arquivo, linha)) {
            istringstream iss(linha);
            string nome;
            double quantidade, valor;

            if (getline(iss, nome, ',') &&
                iss >> quantidade &&
                iss.ignore() &&
                iss >> valor) {
                produtos.push_back({nome, quantidade, valor});
            }
        }
        arquivo.close();
        cout << "Produtos carregados com sucesso do arquivo produtos.txt" << endl;
    } else {
        cout << "Arquivo produtos.txt não encontrado. Iniciando com estoque vazio." << endl;
    }
    return produtos;
}

Produto cadastrarProduto() {
    Produto novoProduto;

    cout << "Digite o nome do produto: ";
    getline(cin, novoProduto.nome);

    novoProduto.quantidade = lerNumeroValido("Digite a quantidade (em unid. ou kg) do produto : ");
    novoProduto.valor = lerNumeroValido("Digite o valor (/unid. ou /kg) do produto: R$ ");

    return novoProduto;
}

void exibirProduto(const Produto& produto) {
    cout << fixed << setprecision(2);
    cout << "Nome: " << produto.nome << ", Quantidade: " << produto.quantidade << " (unid. ou kg), Valor: R$ " << produto.valor << "/unid ou /kg" << endl;
}

void salvarProdutos(const vector<Produto>& produtos) {
    ofstream arquivo("produtos.txt", ios::out);
    if (arquivo.is_open()) {
        for (const auto& produto : produtos) {
            arquivo << produto.nome << "," << produto.quantidade << "," << produto.valor << "\n";
        }
        arquivo.close();
        cout << "Produtos salvos com sucesso em produtos.txt" << endl;
    } else {
        cout << "Erro ao abrir o arquivo para salvar os produtos." << endl;
    }
}

void exibirOpcoesPagamento(double totalVenda) {
    cout << fixed << setprecision(2);
    cout << "\nOpções de Pagamento:" << endl;
    cout << "1. À vista com 5% de desconto: R$ " << totalVenda * 0.95 << endl;
    cout << "2. Em até 3x sem juros:" << endl;
    for (int i = 1; i <= 3; i++) {
        cout << "   " << i << "x de R$ " << totalVenda / i << endl;
    }
    cout << "3. Em até 10x com 10% de juros:" << endl;
    double totalComJuros = totalVenda * 1.1;
    for (int i = 1; i <= 10; i++) {
        cout << "   " << i << "x de R$ " << totalComJuros / i << endl;
    }
}

void processarPagamento(double totalVenda) {
    int opcaoPagamento;
    int numeroParcelas;
    double valorFinal;

    while (true) {
        exibirOpcoesPagamento(totalVenda);

        cout << "\nEscolha a opção de pagamento (1-3): ";
        cin >> opcaoPagamento;
        limparBuffer();

        if (opcaoPagamento < 1 || opcaoPagamento > 3) {
            cout << "Opção inválida. Por favor, escolha uma opção entre 1 e 3." << endl;
            continue;
        }

        switch (opcaoPagamento) {
            case 1:
                valorFinal = totalVenda * 0.95;
                cout << "Pagamento à vista com 5% de desconto." << endl;
                cout << "Valor final: R$ " << valorFinal << endl;
                return;
            case 2:
                cout << "Escolha o número de parcelas (1-3): ";
                cin >> numeroParcelas;
                limparBuffer();
                if (numeroParcelas < 1 || numeroParcelas > 3) {
                    cout << "Número de parcelas inválido. Por favor, escolha entre 1 e 3 parcelas." << endl;
                    continue;
                }
                valorFinal = totalVenda;
                cout << "Pagamento em " << numeroParcelas << "x de R$ " << valorFinal / numeroParcelas << " sem juros." << endl;
                cout << "Valor total: R$ " << valorFinal << endl;
                return;
            case 3:
                cout << "Escolha o número de parcelas (1-10): ";
                cin >> numeroParcelas;
                limparBuffer();
                if (numeroParcelas < 1 || numeroParcelas > 10) {
                    cout << "Número de parcelas inválido. Por favor, escolha entre 1 e 10 parcelas." << endl;
                    continue;
                }
                valorFinal = totalVenda * 1.1;
                cout << "Pagamento em " << numeroParcelas << "x de R$ " << valorFinal / numeroParcelas << " com 10% de juros." << endl;
                cout << "Valor total: R$ " << valorFinal << endl;
                return;
        }
    }
}

void realizarVendas(vector<Produto>& produtos) {
    vector<ItemVenda> carrinho;
    string nomeProduto;
    double quantidadeVenda;
    char continuar;

    do {
        cout << "Digite o nome do produto a ser vendido: ";
        getline(cin, nomeProduto);

        auto it = find_if(produtos.begin(), produtos.end(),
                          [&nomeProduto](const Produto& p) { return p.nome == nomeProduto; });

        if (it != produtos.end()) {
            quantidadeVenda = lerNumeroValido("Digite a quantidade a ser vendida (em kg): ");

            if (quantidadeVenda <= it->quantidade) {
                it->quantidade -= quantidadeVenda;

                ItemVenda item;
                item.nome = it->nome;
                item.quantidade = quantidadeVenda;
                item.valorUnitario = it->valor;
                item.valorTotal = quantidadeVenda * it->valor;

                carrinho.push_back(item);

                cout << "Produto adicionado ao carrinho." << endl;
            } else {
                cout << "Erro: Quantidade insuficiente em estoque." << endl;
                cout << "Quantidade disponível: " << it->quantidade << " kg" << endl;
            }
        } else {
            cout << "Produto não encontrado no estoque." << endl;
        }

        cout << "Deseja adicionar mais produtos? (S/N): ";
        cin >> continuar;
        limparBuffer();
    } while (toupper(continuar) == 'S');

    // Exibir resumo da venda
    double totalVenda = 0;
    cout << "\nResumo da venda:" << endl;
    cout << fixed << setprecision(2);
    for (const auto& item : carrinho) {
        cout << item.nome << ": " << item.quantidade << " kg x R$ " << item.valorUnitario << "/kg = R$ " << item.valorTotal << endl;
        totalVenda += item.valorTotal;
    }
    cout << "Total da venda: R$ " << totalVenda << endl;

    // Processo de pagamento
    processarPagamento(totalVenda);
    cout << "Venda finalizada com sucesso!" << endl;
}


int main() {
    vector<Produto> produtos = carregarProdutos();
    int opcao;

    do {
        cout << "\n--- Menu ---" << endl;
        cout << "1. Cadastrar Produto" << endl;
        cout << "2. Realizar Vendas" << endl;
        cout << "3. Exibir Estoque" << endl;
        cout << "4. Sair" << endl;
        cout << "Escolha uma opção: ";
        cin >> opcao;
        limparBuffer();

        switch (opcao) {
            case 1: {
                Produto novoProduto = cadastrarProduto();
                auto it = find_if(produtos.begin(), produtos.end(),
                                  [&novoProduto](const Produto& p) { return p.nome == novoProduto.nome; });

                if (it != produtos.end()) {
                    it->quantidade += novoProduto.quantidade;
                    it->valor = novoProduto.valor;
                    cout << "Produto existente atualizado." << endl;
                } else {
                    produtos.push_back(novoProduto);
                    cout << "Novo produto adicionado." << endl;
                }
                break;
            }
            case 2:
                realizarVendas(produtos);
                break;
            case 3:
                cout << "\nProdutos em estoque:" << endl;
                for (const auto& produto : produtos) {
                    exibirProduto(produto);
                }
                break;
            case 4:
                cout << "Encerrando o programa..." << endl;
                break;
            default:
                cout << "Opção inválida. Tente novamente." << endl;
        }
    } while (opcao != 4);

    salvarProdutos(produtos);

    return 0;
}
