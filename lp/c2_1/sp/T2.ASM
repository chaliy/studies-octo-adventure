sseg segment stack
    db 256 dup(?)
sseg ends
dseg segment
    directory_name db 'CHALIY',0
    file_name db 'MIKE',0 
    text db 'VASILIY' 
    text_len dw 7
    root_directory db 'C:\',0 
    error_message db 'Unhandled error occured.$'
dseg ends

cseg segment
    assume ss:sseg, cs:cseg, ds:dseg 
start:
    jmp main 
main:   

    mov ax,seg dseg
    mov ds,ax

    ; Create new folder
    mov dx,offset directory_name
    mov ah,39h 
    int 21h 
    jc erop

    ; Change directory
    mov dx,offset directory_name     
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

    ; Write text
    mov dx,offset text
    mov cx,text_len
    mov ah,40h 
    int 21h 
    jc erop 

    ; Close file
    mov ah,3eh
    int 21h 
    jc erop 

    ; Chand directory to root
    mov dx,offset root_directory                
    mov ah,3bh 
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