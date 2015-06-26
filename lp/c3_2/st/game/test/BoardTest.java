import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by Mike on 13.07.2014.
 */
public class BoardTest {

    @Test
    public void should_generate_correct_twin(){

        int[][] blocks = {
                {0, 1, 3},
                {4, 2, 5},
                {7, 8, 6}};
        Board board = new Board(blocks);
        Board twinBoard = board.twin();

        assertEquals("3\n" +
                " 0  1  3 \n" +
                " 2  4  5 \n" +
                " 7  8  6 \n", twinBoard.toString());
    }

    @Test
    public void should_calculate_hamming(){
        int[][] blocks = {
                {8, 1, 3},
                {4, 0, 2},
                {7, 6, 5}};
        Board board = new Board(blocks);

        assertEquals(5, board.hamming());
    }

    @Test
    public void should_calculate_manhattan(){
        int[][] blocks = {
                {8, 1, 3},
                {4, 0, 2},
                {7, 6, 5}};
        Board board = new Board(blocks);

        assertEquals(10, board.manhattan());
    }

    @Test
    public void should_return_neighbors(){
        Board board = new Board(new int[][]{
                {8, 1, 3},
                {4, 2, 0},
                {7, 6, 5}});

        List<Board> neighbors = Lists.newArrayList(board.neighbors());

        assertEquals(3, neighbors.size());

        assertEquals(new Board(new int[][]{
                {8, 1, 0},
                {4, 2, 3},
                {7, 6, 5}}), neighbors.get(0));

        assertEquals(new Board(new int[][]{
                {8, 1, 3},
                {4, 0, 2},
                {7, 6, 5}}), neighbors.get(1));

        assertEquals(new Board(new int[][]{
                {8, 1, 3},
                {4, 2, 5},
                {7, 6, 0}}), neighbors.get(2));
    }

    @Test
    public void should_return_neighbors_central(){
        Board board = new Board(new int[][]{
                {8, 1, 3},
                {4, 0, 2},
                {7, 6, 5}});

        List<Board> neighbors = Lists.newArrayList(board.neighbors());

        assertEquals(4, neighbors.size());
    }

    @Test
    public void should_equals(){
        Board board1 = new Board(new int[][]{
                {8, 1, 3},
                {4, 2, 0},
                {7, 6, 5}});

        Board board2 = new Board(new int[][]{
                {8, 1, 3},
                {4, 2, 0},
                {7, 6, 5}});

        assertTrue(board1.equals(board2));
    }
}
