#include <iostream>
using namespace std;

int main() {
    int posicaoMoeda = 0;

    char jogador;
    cout << "= = = Bem-vindo ao jogo do copo = = = \nVocê quer jogar como embaralhador (e) ou adivinhador? (a) \n";
    cin >> jogador;

    if (jogador == 'e' || jogador == 'E') {
        int proximoMovimento;
        int numMovimentos;

        cout << "Quantos movimentos quer realizar?\n";
        cin >> numMovimentos;

        if (numMovimentos <= 0) {
            cout << "Número inválido, favor inserir um valor maior que zero. \nEncerrando programa...";
            return -1;
        }

        char posInicial;
        cout << "Qual a posição inicial da moeda? (A / B / C)\n";
        cin >> posInicial;

        if (posInicial == 'A' || posInicial == 'a') {
            posicaoMoeda = 1;
        } else if (posInicial == 'B' || posInicial == 'b') {
            posicaoMoeda = 2;
        } else if (posInicial == 'C' || posInicial == 'c') {
            posicaoMoeda = 3;
        } else {
            cout << "\nValor inválido. Por favor insira um valor válido. \nEncerrando programa...";
            return -1;
        }

        for (int i = 1; i <= numMovimentos; i++) {
            cout << "\nQual será o próximo movimento?\n1. Trocar a posição entre os copos A e B.\n2. Trocar a posição entre os copos B e C.\n3. Trocar a posição entre os copos A e C.\n";
            cin >> proximoMovimento;
            bool movimentoInvalido = false;

            if (proximoMovimento == 1) {
                if (posicaoMoeda == 1) {
                    posicaoMoeda = 2;
                } else if (posicaoMoeda == 2) {
                    posicaoMoeda = 1;
                } else {
                    movimentoInvalido = true;
                }
            } 
            
            else if (proximoMovimento == 2) {
                if (posicaoMoeda == 2) {
                    posicaoMoeda = 3;
                } else if (posicaoMoeda == 3) {
                    posicaoMoeda = 2;
                } else {
                    movimentoInvalido = true;
                }
            }
            
            else if (proximoMovimento == 3) {
                if (posicaoMoeda == 1) {
                    posicaoMoeda = 3;
                } else if (posicaoMoeda == 3) {
                    posicaoMoeda = 1;
                } else {
                    movimentoInvalido = true;
                }
            } else {
                cout << "Valor inválido. Por favor insira um valor entre 1 e 3\n";
                i--;
                continue;
            }

            if (movimentoInvalido) {
                cout << "Movimento inválido. A posição da moeda não foi alterada.\n";
                i--;
                continue;
            }

            char posicaoMoedaEscrita;
            if (posicaoMoeda == 1) {
                posicaoMoedaEscrita = 'A';
            } else if (posicaoMoeda == 2) {
                posicaoMoedaEscrita = 'B';
            } else if (posicaoMoeda == 3) {
                posicaoMoedaEscrita = 'C';
            }

            cout << "Posição atual da moeda: " << posicaoMoedaEscrita << "\n";
        }

    } else if (jogador == 'a' || jogador == 'A') {
        int quantMovimentos;
        char palpite;

        cout << "A posição inicial da moeda é no copo C\n";
        cout << "Quantos movimentos você observou\n";
        cin >> quantMovimentos;

        cout << "Qual o seu palpite da posição final da moeda? (A / B / C)\n";
        cin >> palpite;

        if (quantMovimentos >= 1 && quantMovimentos < 7) {
            posicaoMoeda = 2;
        } else if (quantMovimentos >= 7 && quantMovimentos < 12) {
            posicaoMoeda = 3;
        } else if (quantMovimentos >= 12 && quantMovimentos < 18) {
            posicaoMoeda = 1;
        } else if (quantMovimentos >= 18 && quantMovimentos < 33) {
            posicaoMoeda = 1;
        } else if (quantMovimentos >= 33 && quantMovimentos < 47) {
            posicaoMoeda = 2;
        } else if (quantMovimentos >= 47 && quantMovimentos < 62) {
            posicaoMoeda = 2;
        } else if(quantMovimentos >= 62 && posicaoMoeda < 100){
            posicaoMoeda = 3;
        } else if(posicaoMoeda >= 100){
            posicaoMoeda = 1;
        } else {
            cout << "\nValor inválido. Por favor insira um valor válido. \nEncerrando programa...";
            return -1;
        }

        if (palpite == 'A' || palpite == 'a') {
            if (posicaoMoeda == 1) {
                cout << "Parabéns, você acertou!";
            } else {
                cout << "Palpite incorreto";
            }
        } else if (palpite == 'B' || palpite == 'b') {
            if (posicaoMoeda == 2) {
                cout << "Parabéns, você acertou!";
            } else {
                cout << "Palpite incorreto";
            }
        } else if (palpite == 'C' || palpite == 'c') {
            if (posicaoMoeda == 3) {
                cout << "Parabéns, você acertou!";
            } else {
                cout << "Palpite incorreto";
            }
        } else {
            cout << "\nValor inválido. Por favor insira um valor válido. \nEncerrando programa...";
            return -1;
        }

    } else {
        cout << "Valor inválido, favor inserir 'e' para embaralhador ou 'a' para adivinhador.\nEncerrando programa...";
    }

    return 0;
}