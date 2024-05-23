#include <iostream>
using namespace std;

int main()
{
    int numero, soma;
    cout << "Digite um número inteiro: \n ";
    cin >> numero;

    while (numero > 0) {
        int ultimoDigito = numero % 10;
        soma = soma + ultimoDigito;
        numero = numero / 10;
    }
    
    cout << "A soma de cada numero dentro do valor que você digitou, resulta em: " << soma;
}
