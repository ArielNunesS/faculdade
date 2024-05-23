#include <iostream>
using namespace std;

int main()
{
    float valor;
    cout << "DIgite o valor monetário em R$: \n ";
    cin >> valor;
    
    int valorNotas, valorMoedas, n100, n50, n20, n10, n5, n2, m1, m050, m025, m010, m005, m001;
    valorNotas = int(valor);
    valorMoedas = (valor - int(valor)) * 100;
    
    n100 = valorNotas/100;
    n50 = (valorNotas%100)/ 50;
    n20 = ((valorNotas%100)%50)/20;
    n10 = ((valorNotas%100)%50)%20/10;
    n5 = ((valorNotas%100)%50)%20%10/5;
    n2 = ((valorNotas%100)%50)%20%10%5/2;
    m1 = ((valorNotas%100)%50)%20%10%5%2/1;
    m050 = valorMoedas%100/50;
    m025 = valorMoedas%100%50/25;
    m010 = valorMoedas%100%50%25/10;
    m005 = valorMoedas%100%50%25%10/5;
    m001 = (valorMoedas % 100 % 50 % 25 % 10 % 5) / 0.10 / 10;
    
    cout << "O valor R$" << valor << " pode ser decomposto em: \n";
    
    if(n100 > 0){
        cout << n100 << " cédula(s) de R$100,00 \n";
    }

    if(n50 > 0){
        cout << n50 << " cédula(s) de R$50,00 \n";
    }

    if(n20 > 0){
        cout << n20 << " cédula(s) de R$20,00 \n";
    }

    if(n10 > 0){
        cout << n10 << " cédula(s) de R$10,00 \n";
    }

    if(n5 > 0){
        cout << n5 << " cédula(s) de R$5,00 \n";
    }

    if(n2 > 0){
        cout << n2 << " cédula(s) de R$2,00 \n";
    }

    if(m1 > 0){
        cout << m1 << " moeda(s) de R$1,00 \n";
    }

    if(m050 > 0){
        cout << m050 << " moeda(s) de R$0,50 \n";
    }

    if(m025 > 0){
        cout << m025 << " moeda(s) de R$0,25 \n";
    }

    if(m010 > 0){
        cout << m010 << " moeda(s) de R$0,10 \n";
    }
    
    if(m005 > 0){
        cout << m005 << " moeda(s) de R$0,05 \n";
    }

    if(m001 > 0){
        cout << m001 << " moeda(s) de R$0,01 \n";
    }

}