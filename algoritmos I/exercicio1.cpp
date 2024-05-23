#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Digite o número de pessoas entrevistadas: ";
    cin >> n;

    if (n <= 0) {
        cout << "O número de pessoas deve ser maior que zero." << endl;
        return 1;
    }

    double salario;
    double maiorSalario = 0.0;

    for (int i = 1; i <= n; ++i) {
        cout << "Digite o salário da pessoa " << i << ": " << endl;
        cin >> salario;

        if (i == 1 || salario > maiorSalario) {
            maiorSalario = salario;
        }
    }

    cout << "O maior salário dentre os entrevistados é: " << maiorSalario << endl;

    return 0;
}