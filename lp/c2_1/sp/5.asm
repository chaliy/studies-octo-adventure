sseg         segment stack
              DB       256     DUP(?)
sseg         ends

dseg     segment
mas       db      "abc$"
error      db      "errorr$"
dseg     ends

cseg     segment
            assume           cs:cseg,ds:dseg,ss:sseg

start:    jmp              main
main:   push             ds
            mov              ax,0
            push             ax
            mov              ax,dseg
            mov              ds,ax

            mov             si,0
            mov             cx,3

            mov             ah,0
            mov             dx,0                       ;ініціалізація послідовного порту
            mov             al,11111111B
            int               14h

C1:      mov             ah,3
            int               14h
            test              ah,100000B           ;перевірка статусу послідовного порту
            jz                 C1

            mov             ah,1
            mov             al,mas[si]
            int               14h
            test              ah,11110b
            jnz               err

            inc               si
            loop             C1                          ;передача
            
exit:     mov             ax,4c00h
            int                21h
err:      mov              dx,offset error
            mov              ah,9
            int                21h                        ;вивід повідомлення про помилку
            jmp              exit


cseg     ends
            end              start











