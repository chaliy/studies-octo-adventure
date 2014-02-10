; Constants
REC_WIDTH equ 75
REC_HEIGHT equ 45
REC_COLOR equ 5

sseg segment stack
    db 256 dup(?)
sseg ends
dseg segment
    start_x  dw ?
    exit_message db "Press any key to exit...", "$" 
dseg ends

cseg segment
    assume ss:sseg, cs:cseg, ds:dseg 
start:
    jmp main 
main:   

    mov ax,seg dseg
    mov ds,ax

    ; VGA Mode
    mov ax,0012h
    int 10h

    ; Mouse
    mov ax,0 
    int 33h 

    ; Show cursor
    mov ax,1 
    int 33h 

ms:     
    mov ax,3 ; Read mouse state
    int 33h

    test bx,001b ; Test if left button not pressed
    jz ms

    mov ax,2 ; Hide cursor
    int 33h 

    mov start_x,cx ; X
    mov si,cx
    add si,REC_WIDTH
    mov di,dx ; Y
    add di,REC_HEIGHT

    ; Draw rect

    mov ah,0ch  ; Pixel output mode
    mov bh,0 ; Page
    mov al,REC_COLOR
draw_line: 
    mov cx,start_x ; Start from start_x
draw_pixel: 
    int 10h

    inc cx ; Next column
    cmp cx,si 
    jl draw_pixel

    inc dx ; Next row
    cmp dx,di 
    jl draw_line

    ; Print exit message
    mov ah,09
    lea dx,exit_message
    int 21h

    ; Wait user input
    mov ah,08h 
    int 21h 

    ; Clean view port(FreeDOS)
    mov ax,0003h ; Text mode
    int 10h

    ; Exit all good
    mov ax,4c00h
    int 21h

cseg ends
 end start