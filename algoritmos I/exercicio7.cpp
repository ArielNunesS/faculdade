#include <iostream>
using namespace std;

int main() {
    int numTermos, t1 = 0, t2 = 1, proximoTermo = 0;

    cout << "Digite a quantiade de termos: \n";
    cin >> numTermos;

    if(numTermos <= 0){
        cout << "Por favor insira um número maior que zero";
        return -1;
    }

    cout << "\n Sequência Fibonacci: ";

    for (int i = 1; i <= numTermos; ++i) {
        
        if(i == 1) {
            cout << t1 << ", ";
        }
        if(i == 2) {
            cout << t2 << ", ";
        }
        
            proximoTermo = t1 + t2;
            t1 = t2;
            t2 = proximoTermo;
        
            cout << proximoTermo << ", ";
    }
    
    return 0;
}