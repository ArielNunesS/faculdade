#include <iostream>
using namespace std;

int main()
{
    int numero, soma;
    soma = 0;
    
    cout << "Vamos verificar se um número é um número perfeito \n Digite um número inteiro: (deve ser maior que zero) \n";
    cin >> numero;
    
    if(numero <= 0){
        cout << "Número inválido, favor digitar um número inteiro e maior do que zero";
    }

    for(int i = 1; i < numero; i++){
        if(numero % i == 0){
            soma += i;
        }
    }
    
    if(soma == numero){
        cout << "O número " << numero << " é um número perfeito";
    } else {
        cout << "O número " << numero << " não é um número perfeito";
    }
    
    return 0;
}
