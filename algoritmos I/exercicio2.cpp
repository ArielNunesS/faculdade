#include <iostream>
using namespace std;

int main()
{
    float popPaisA, popPaisB, natalidadeA, natalidadeB;
    popPaisA = 5000000;
    popPaisB = 7000000;
    natalidadeA = 0.03;
    natalidadeB = 0.02;
    
    
    for(int i = 1; popPaisA <= popPaisB; i++){
        popPaisA = popPaisA + popPaisA * natalidadeA;
        popPaisB = popPaisB + popPaisB * natalidadeB;
        
        if(popPaisA >= popPaisB){
            cout << "O tempo estimado para que a população do Pais A ultrapasse a população do Pais B é de " << i << " anos";
        }
    }

}
