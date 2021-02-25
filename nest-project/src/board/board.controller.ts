import {Controller, Get, Param} from '@nestjs/common';
import {BoardService} from './board.service';
import {BoardModel} from "../model/board.model";

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService) {
    }
    @Get(':userId')
getBoards(@Param('userId') userId: string): Promise<Array<BoardModel>> {
        return this.boardService.getBoardByUserId(userId)
    }
}
