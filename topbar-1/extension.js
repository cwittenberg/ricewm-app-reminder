import Clutter from 'gi://Clutter';
import Shell from 'gi://Shell';
import St from 'gi://St';
import GObject from 'gi://GObject';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

const Indicator=GObject.registerClass(class Indicator extends PanelMenu.Button {
    _init(){
        super._init(0.0,"Reminder",true);
        const companion=Shell.AppSystem.get_default().lookup_app("riceapp-dev.herdr.generated.reminder.desktop");
        this.add_child(companion?.create_icon_texture(16) || new St.Icon({icon_name:'application-x-executable-symbolic',style_class:'system-status-icon'}));
        this.connect('button-release-event',(_actor,event)=>{
            if(event.get_button()!==1)return Clutter.EVENT_PROPAGATE;
            const app=Shell.AppSystem.get_default().lookup_app("riceapp-dev.herdr.generated.reminder.desktop");
            if(app)app.activate();
            else Main.notifyError("Reminder",'The companion app is unavailable.');
            return Clutter.EVENT_STOP;
        });
    }
});
export default class GeneratedExtension extends Extension {
    enable(){this._indicator=new Indicator();Main.panel.addToStatusArea(this.uuid,this._indicator);}
    disable(){this._indicator?.destroy();this._indicator=null;}
}
