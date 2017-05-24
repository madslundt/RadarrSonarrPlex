import {IProfile} from '../ProfileStore';
import delay from '../../../infrastructure/api/apiMockDelay';

const profiles: IProfile[] = [
    {
        id: '1',
        firstName: 'Test',
        lastName: 'Test',
        image: ''
    }
];

export const getProfile = (id: string): Promise<IProfile> => {
    return new Promise<IProfile>((resolve, reject) => {
        const profile: IProfile | undefined = profiles.find(profile => profile.id === id);
        setTimeout(() => {
            if (!!profile) {
                resolve(profile);
            } else {
                reject('No profile found with that id');
            }
        }, delay);

    });
}