
import Config from '../Config';
import Signature from './../../models/interfaces/auth/forgetPassword';
import {ModelNotFoundError} from '../../lib/errors';
import generateRandomToken from '../../lib/generateRandomToken';
import globalConfig from './../../appConfig';
import { MAIL_RECOVERY_PASSWORD_SUBJECT } from './../../constants';

export default (config: Config): Signature =>
  async ({email}) => {

      const user: any = await config.repo.getUserByEmail({email});

      const token = generateRandomToken();

      await config.repo.createResetPasswordToken({userId: user.id, token});

      await config.repo.sendEmail({
        from: globalConfig.mail.from,
        to: email,
        subject: MAIL_RECOVERY_PASSWORD_SUBJECT,
        text: `Hello,
        Someone requested a password reset for your account.
        If you'd like to reset your password use the token below:

        ${token}

        Thanks,
        Support Team`
      });

  };
