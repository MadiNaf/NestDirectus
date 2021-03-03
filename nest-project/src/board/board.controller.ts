import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardModel } from "../model/board.model";

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService) {}

    @Get(':userId')
    getBoards(@Param('userId') userId: string): Promise<Array<BoardModel>> {
        return this.boardService.getBoardByUserId(userId)
    }

    @Post('new')
    createUserBoard(@Body() userBoard: BoardModel): Promise<BoardModel> {
        return this.boardService.createBoard(userBoard);
    }
}
