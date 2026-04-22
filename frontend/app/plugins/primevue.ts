import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import DatePicker from 'primevue/datepicker';
import ToggleSwitch from 'primevue/toggleswitch';
import InputSwitch from 'primevue/toggleswitch'; // Alias for compatibility
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Drawer from 'primevue/drawer';
import TabView from 'primevue/tabview';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';
import TreeTable from 'primevue/treetable';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    },
  });

  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.directive('tooltip', Tooltip);

  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('Card', Card);
  nuxtApp.vueApp.component('Dialog', Dialog);
  nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog);
  nuxtApp.vueApp.component('InputNumber', InputNumber);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('PanelMenu', PanelMenu);
  nuxtApp.vueApp.component('Password', Password);
  nuxtApp.vueApp.component('DataTable', DataTable);
  nuxtApp.vueApp.component('Column', Column);
  nuxtApp.vueApp.component('Tag', Tag);
  nuxtApp.vueApp.component('MultiSelect', MultiSelect);
  nuxtApp.vueApp.component('Select', Select);
  nuxtApp.vueApp.component('SelectButton', SelectButton);
  nuxtApp.vueApp.component('Textarea', Textarea);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.component('Drawer', Drawer);
  nuxtApp.vueApp.component('TabView', TabView);
  nuxtApp.vueApp.component('Tabs', Tabs);
  nuxtApp.vueApp.component('TabList', TabList);
  nuxtApp.vueApp.component('Tab', Tab);
  nuxtApp.vueApp.component('TabPanels', TabPanels);
  nuxtApp.vueApp.component('TabPanel', TabPanel);
  nuxtApp.vueApp.component('RadioButton', RadioButton);
  nuxtApp.vueApp.component('Checkbox', Checkbox);
  nuxtApp.vueApp.component('DatePicker', DatePicker);
  nuxtApp.vueApp.component('TreeTable', TreeTable);
  nuxtApp.vueApp.component('ToggleSwitch', ToggleSwitch);
  nuxtApp.vueApp.component('InputSwitch', ToggleSwitch); // Alias
  nuxtApp.vueApp.component('Avatar', Avatar);
  nuxtApp.vueApp.component('AvatarGroup', AvatarGroup);
  nuxtApp.vueApp.component('Accordion', Accordion);
  nuxtApp.vueApp.component('AccordionPanel', AccordionPanel);
  nuxtApp.vueApp.component('AccordionHeader', AccordionHeader);
  nuxtApp.vueApp.component('AccordionContent', AccordionContent);
  nuxtApp.vueApp.component('ProgressBar', ProgressBar);
  nuxtApp.vueApp.component('Slider', Slider);
});
