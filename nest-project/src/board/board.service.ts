import { Injectable } from '@nestjs/common';
import { BoardModel } from '../model/board.model';
import { directus } from '../main';

@Injectable()
export class BoardService {
    public async getBoardByUserId(userId: string): Promise<Array<BoardModel>> {
        let listBoard: Array<BoardModel> = new Array<BoardModel>();
        const query = { filter: { id_user: {_eq: userId} }};

        await directus.items('board').read(query)
            .then( response => {

                response.data.forEach(board => {
                    listBoard.push(board)
                })
                console.log('resp: ', listBoard)
            })
            .catch( error => console.log('error get board'))
        return listBoard;
    }

    public createBoard() {}
}
