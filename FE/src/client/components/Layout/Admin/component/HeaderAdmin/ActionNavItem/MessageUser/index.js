import classNames from "classnames/bind";
import style from './Message.module.scss'
import HeadelessTippy from '@tippyjs/react/headless';
import { Wrapper } from "../../../../../../../Poper";
import MenuUser from "../../../../../../../MenuUser";
const cx = classNames.bind(style)
function MessageUser({ children, data }) {
 
    return ( 
        <HeadelessTippy
            render={attrs => (
                <div className={cx('info-result')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        <MenuUser data={data}/>
                    </Wrapper>
                </div>
            )}
            interactive   
            placement="top"
            trigger='click'
        >
            {children}
        </HeadelessTippy>
     );
}

export default MessageUser;