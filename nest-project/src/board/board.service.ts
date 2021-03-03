import { Injectable } from '@nestjs/common';
import { BoardModel } from '../model/board.model';
import { directus } from '../main';

@Injectable()
export class BoardService {
    public readonly BOARD_COLLECTION: string = 'board';

    public async getBoardByUserId(userId: string): Promise<Array<BoardModel>> {
        let listBoard: Array<BoardModel> = new Array<BoardModel>();
        const query = { filter: { id_user: {_eq: userId} }};

        await directus.items(this.BOARD_COLLECTION).read(query)
            .then( response => {

                response.data.forEach(board => {
                    listBoard.push(board)
                })
                console.log('resp: ', listBoard)
            })
            .catch( error => console.log('error get board'))
        return listBoard;
    }

    public async createBoard(userBoard: BoardModel): Promise<BoardModel> {
        let retour: BoardModel = new BoardModel();
        await directus.items(this.BOARD_COLLECTION).create(userBoard)
            .then(response => {
                console.log('resp: ', response)
                retour = response.data
            })
            .catch(error => console.log('err: ', error));

        return retour;
    }
}
