sseg         segment stack
              DB       256     DUP(?)
sseg         ends

dseg     segment
error      db      'error$'
mas       db      3 DUP (?)
dseg     ends

cseg     segment
            assume           cs:cseg,ds:dseg,ss:sseg

start:    jmp              main
main:    push             ds
            mov              ax,0
            push             ax
            mov              ax,dseg
            mov              ds,ax
            mov             si,0
            mov             cx,3

            mov             ah,0
            mov             dx,0                       ;³í³ö³àë³çàö³ÿ ïîñë³äîâíîãî ïîðòó
            mov             al,11111111B
            int              14h

C1:       mov             ah,3
            int              14h
            test             ah,1B                     ;ïåðåâ³ðêà ñòàòóñó ïîñë³äîâíîãî ïîðòó
            jz                C1

            mov            ah,2
            int              14h
            test            ah,11110B
            jnz             err

            mov            mas[si],al
            inc              si
            loop            C1                          ;pruimau
            

exit:     mov              ax,4c00h
            int                21h
err:      mov              dx,offset error
            mov              ah,9
            int                21h                        ;âèâ³ä ïîâ³äîìëåííÿ ïðî ïîìèëêó
            jmp              exit


cseg     ends
            end              start

