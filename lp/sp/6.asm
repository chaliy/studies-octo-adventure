.286
.model	tiny
.stack
.code
	org	100h
start:	jmp	main
vold	dd	?

handl	proc	far
	push	cs
	pop	ds
	pusha
;====================================	
	mov	ah,6
	mov	dl,7                   ;функція DOS:динамік піщить
	int	21h
;====================================
	mov	ah,07h                 ;відключаю сигнал переривань годинника реального часу
	int	1ah
;====================================
	lds	dx,vold
	mov	ah,25h
	mov	al,4ah                 ;відновлення старого обрбника переривань
	int	21h
	popa
;====================================
	mov	al,20h
	out	0ah,al                 ;переключається на нового, якщо пріоритет вищий
	out	20h,al
	iret
;====================================
fin	equ	$
handl	endp
;====================================
main:	push	cs
	pop	ds
	pusha
;====================================
	mov	ah,07h                 ;обнулили
	int	1ah
;====================================
	mov	ch,00100011b
	mov	cl,01000101b
	mov	dh,00110101b           ;запис часу
	mov	ah,06h
	int	1ah
	jc	erro
;====================================
	mov	ah,35h
	mov	al,4ah
	int	21h
	mov	word ptr vold,bx       ;збереження адреси старого обробника переривань
	mov	word ptr vold+2,es
	push	ds
;====================================
	mov	dx,offset handl
	mov	al,4ah
	mov	ah,25h                 ;новий обробник
	int	21h       
;====================================
	pop	ds
	popa
	lea	dx,fin
	int	27h
;====================================
erro:	mov	bh,0
	mov	cx,3
	mov	al,'e'                 ;вивід повідомлення про помилку
	mov	ah,0ah
	int	10h
	ret
	end	start