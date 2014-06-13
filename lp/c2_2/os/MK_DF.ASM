sseg segment stack
    db 256 dup(?)
sseg ends
dseg segment    
    file_name db 'EMTPY',0    
    root_directory db 'C:\',0 
    error_message db 'Unhandled error occured.$'
    PSP word ? ;Program segment prefix
dseg ends

cseg segment
    assume ss:sseg, cs:cseg, ds:dseg 
start:
    jmp main 
main:   

    push    ds              ;Save PSP value
    mov     ax, seg DSEG    ;Point DS and ES at our data segment
    mov     ds, ax
    mov     es, ax
    pop     PSP             ;Store PSP value into "PSP"

    ; Init reading command line
    mov es, PSP
    mov bx, 82h

    ; Create new folder
    mov dx, bx
    mov ah,39h 
    int 21h 
    jc erop

    ; Change directory
    mov dx, bx
    mov ah,3bh
    int 21h 
    jc erop
 
    ; Create new file
    mov dx,offset file_name                
    mov cx,0 ; No attributes     
    mov ah,5bh ; Create and open
    int 21h 
    jc erop 
    mov bx,ax ; Store file handle

    ; Close file
    mov ah,3eh
    int 21h 
    jc erop     

exit:
    ; Exit all good
    mov ax,4c00h
    int 21h

erop: 
    ; Show error message
    mov dx,offset error_message
    mov ah,9
    int 21h

    jmp exit 


cseg ends
 end start