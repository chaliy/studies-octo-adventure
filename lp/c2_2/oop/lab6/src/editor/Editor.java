package editor;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;

import java.awt.BorderLayout;

import javax.swing.JOptionPane;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.JPanel;
import javax.swing.JButton;
import javax.swing.JTextArea;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Insets;
import java.awt.Rectangle;

import javax.swing.border.LineBorder;

import java.awt.Color;
import java.io.FileWriter;
import java.io.IOException;

public class Editor {

	private JFrame frame;
	private JTextField fileNameField;
	private JTextArea textArea;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Editor window = new Editor();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public Editor() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 574, 375);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		JLabel captionLabel = new JLabel("Введення тексту у файл");
		frame.getContentPane().add(captionLabel, BorderLayout.NORTH);
		
		JPanel panel = new JPanel();
		frame.getContentPane().add(panel, BorderLayout.SOUTH);
		
		JLabel fileNameLabel = new JLabel("Введіть ім'я файлу:");
		panel.add(fileNameLabel);
		fileNameLabel.setHorizontalAlignment(SwingConstants.LEFT);
		
		fileNameField = new JTextField();
		fileNameField.setText("file.txt");
		panel.add(fileNameField);
		fileNameField.setColumns(20);
		
		JButton saveButton = new JButton("Зберегти");
		saveButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				saveFile();
			}
		});
		panel.add(saveButton);
		
		textArea = new JTextArea();
		textArea.setBorder(new LineBorder(new Color(192, 192, 192), 1, true));
		textArea.setBounds(new Rectangle(2, 2, 2, 2));
		textArea.setMargin(new Insets(10, 2, 2, 2));
		frame.getContentPane().add(textArea, BorderLayout.CENTER);
	}
	
	private void saveFile(){
		String fileName = this.fileNameField.getText();
		
		if (fileName == null || fileName.length() == 0){
			JOptionPane.showMessageDialog(frame,"Будьте ласкаві, введіть ім'я файлу");
			return;
		}
		
		String text = this.textArea.getText();
		
		try {
			FileWriter fw = new FileWriter(fileName, false);
			
			fw.write(text);
			
			fw.close();
			
			JOptionPane.showMessageDialog(frame,"Файл збережено");
			
		} catch (IOException e) {			
			e.printStackTrace();
			JOptionPane.showMessageDialog(frame, "Помилка запису файла\n" + e.getMessage());
		} 
	}
}