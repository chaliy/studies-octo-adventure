.model small
.stack
.data
        message db "Hello world!", "$"   
.code
 start:

    mov    ax,seg message
    mov    ds,ax

    // Print message
    mov    ah,09    
    lea    dx,message
    int    21h

    // Exit all good
    mov    ax,4c00h
    int    21h
 end start