import java.awt.*; 
import java.awt.event.*;
import java.applet.*;

public class PlayImage extends Applet {
	
	// При клацанні мишею по зображенню в графічному вікні воно 
	// міняється на інше зображення такого ж розміру, 
	// а при повторному клацанні відновлюється первинне зображення.
	
	private static final long serialVersionUID = -5756110082683888874L;
	private Image img1;
	private Image img2;
	
	private boolean drawSecond;
	
	public void init(){ 
		img1 = getImage(getDocumentBase(), "img1.jpg");
		img2 = getImage(getDocumentBase(), "img2.jpg");
		
		setSize(500, 281);
		
		addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				toggleImage();
				
			}
		});
	} 

	public void paint(Graphics g){
		Image current = drawSecond ? img2 : img1; 
		int width = current.getWidth(this);
		int height = current.getHeight(this); 
		g.drawImage(current, 0, 0, width, height, this);
	}
		
	private void toggleImage(){		
		drawSecond = !drawSecond;		
		this.repaint();
	}

}
