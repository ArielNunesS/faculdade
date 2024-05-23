#include <iostream>
using namespace std;

int main()
{
    int numInicial, numFinal;
    bool invalido = true;
    bool menorQueZero = true;

    cout << "Verificação de números primos em um determinado intervalo \n";

    while(menorQueZero)
    {
        cout << "Digite o número inicial: ";
        cin >> numInicial;
        if(numInicial <= 0)
        {
            cout << "Por favor, digite um número válido (o número deve ser maior que zero )\n";
        }
        else
        {
            menorQueZero = false;
        }
    }

    while(invalido)
    {
        cout << "Digite o número final: ";
        cin >> numFinal;
        if(numFinal <= numInicial)
        {
            cout << "Por favor, digite um número válido (o número deve ser maior do que o número inicial)\n";
        }
        else
        {
            invalido = false;
        }
    }

    for(int numAtual = numInicial; numAtual <= numFinal; numAtual++)
    {
        int divisores = 0;
        
        for(int i = 1; i <= numAtual; i++)
        {
            if(numAtual % i == 0)
            {
                divisores++;
            }
        }

        if(divisores == 2)
        {
            cout << "O número " << numAtual << " é um número primo. \n";
        }
    }

    return 0;
}
