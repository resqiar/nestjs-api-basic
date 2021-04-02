import { User } from "src/users/entities/users.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

import * as bcrypt from 'bcrypt'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo(){
        return User
    }
    /**
	 * This method get executed right before
	 * The data will be inserted into database
	 * @Usage Hashing Password 
	 */
    async beforeInsert(event: InsertEvent<User>): Promise<void>{
        /**
         * Modify value of plain password to
         * Hashed password and store it in database
         */
        event.entity.password = await bcrypt.hash(event.entity.password, 10) 
    }
}