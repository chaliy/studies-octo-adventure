sseg segment stack
    db 256 dup(?)
sseg ends
dseg segment
        message db "Hello world!", "$"   
dseg ends
cseg segment
 start:
 
    ; push   ds
    ; xor    ax,ax
    ; push   ax
    ; mov    ax,dseg
    ; mov    ds,ax

    mov    ax,seg dseg
    mov    ds,ax

    ; Print message
    mov    ah,09    
    lea    dx,message
    int    21h

    ; Exit all good
    mov    ax,4c00h
    int    21h
cseg ends
 end start