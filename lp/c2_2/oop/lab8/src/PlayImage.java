import java.awt.*;
import java.awt.event.*;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.JOptionPane;

class PlayImage extends Frame {
	
	private static final long serialVersionUID = -5616509887780478705L;
	
	private Image img1;
	private Image img2;
	
	private boolean drawSecond;

	PlayImage(String s) {
		super(s);
		
		try {			
			img1 = ImageIO.read(new File("img1.jpg"));
			img2 = ImageIO.read(new File("img2.jpg"));
		} catch (IOException e) {
			
			JOptionPane.showMessageDialog(this,"Помилка читання файлів картинок. " + e.getMessage());		
			System.exit(0);
		}
		
		setSize(500, 281);
		setVisible(true);
		
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent ev) {
				System.exit(0);
			}
		});
		
		addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				toggleImage();
				
			}
		});
	}
	
	@Override
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

	public static void main(String[] args) {
		new PlayImage("Play with image");
	}
}
