#include <iostream>
#include <string>
using namespace std;
int main()
{
    int num;
    int oop;
    cin >> num;
    cin >> oop;
    for (int f = 0; f < oop; f++) {
        int chars[5] = {0,0,0,0,0};
        int chors[5] = {0,0,0,0,0};
        int max = 0;
        int min = 2147483647;
        int temp;
        int nom = num;
        int counat = 0;
        while (nom > 0) {
            chars[counat] = nom%10;
            chors[counat] = nom%10;
            counat++;
            nom/=10;
        }
        for (int i = 0; i < 5; i++) {
            chars[0] = chors[0];
            chars[1] = chors[1];
            chars[2] = chors[2];
            chars[3] = chors[3];
            chars[4] = chors[4];
            for (int e = 0; e < 5; e++) {
                temp = chars[i];
                chars[i] = chars[e];
                chars[e] = temp;
                int base = 1;
                int nuum = 0;
                for (int i = 0; i < 5; i++) {
                    nuum+=chars[i]*base;
                    base*=10;
                }
                if (nuum > max)
                    max = nuum;
                if (nuum < min)
                    min = nuum;
            }
        }
        if (num > max)
            max = num;
        if (num < min)
            min = num;
        num = max-min;
    }
    cout << num;
}