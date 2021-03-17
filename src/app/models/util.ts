import { LoadingController } from '@ionic/angular';
import { Skill } from './skill';
import { User } from './user';

export class Util {

    public static setStorageUser(user: User) {
        localStorage.setItem('user_info', JSON.stringify(user));
    }

    public static setStorageSkill(skill: Skill) {
        localStorage.setItem('skills_info', JSON.stringify(skill));
    }

    public static getStorageUser(): User {
        const user = JSON.parse(localStorage.getItem('user_info'));
        if (user) {
            return user;
        } else {
            return new User();
        }
    }

    public static getStorageSkills(): Skill {
        const skill = JSON.parse(localStorage.getItem('skills_info'));
        if (skill) {
            return skill;
        } else {
            return new Skill();
        }
    }

    public static removeStorageUser() {
        localStorage.removeItem('user_info');
    }

    public static removeStorageSkill() {
        localStorage.removeItem('skills_info');
    }


}
