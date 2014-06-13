sseg  segment stack
    db     256     dup(?)
sseg  ends

dseg  segment
    buf    db  4 dup (?)
    error_msg  db      "Error occured$"
    PSP word ? ;Program segment prefix
dseg  ends

cseg  segment
    assume  cs:cseg,ds:dseg,ss:sseg

start:    
    jmp   main
main:   
    push    ds              ;Save PSP value
    mov     ax, seg DSEG    ;Point DS and ES at our data segment
    mov     ds, ax
    mov     es, ax
    pop     PSP             ;Store PSP value into "PSP"

    
    ; Init reading command line
    mov es, PSP
    mov bx, 82h

    ; Read and put hours
    mov ax, es:[bx]
    mov dx, 10
    mul dx
    inc bx
    add ax, es:[bx]
    mov ch, al

    ; Skip :
    inc bx

    ; Read and put minutes
    inc bx
    mov ax, es:[bx]
    mov dx, 10
    mul dx
    inc bx
    add ax, es:[bx]
    mov cl, al

    ; Skip :
    inc bx

    ; Read and put seconds
    inc bx
    mov ax, es:[bx]
    mov dx, 10
    mul dx
    inc bx
    add ax, es:[bx]
    mov dh, al
 
    mov dl, 0 

    mov ah, 02dh 
    int 021h

exit:     
    mov    ax,4c00h
    int    21h
err:      
    mov    dx,offset error_msg
    mov    ah,9
    int    21h
    jmp    exit

cseg  ends
    end  start
