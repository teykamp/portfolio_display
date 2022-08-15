# Reusable Components & Snackbar API Documentation

### Reusable Component Directory Path:
```client/src/components/ReusableComponents```

#### Type N/A is used when left undefined, as opposed to undefined (so as to not confuse the JavaScript undefined with undefined)

## CreateCalender.vue
The CreateCalender component is used to display a vuetify calender of type month. This component is applied inside individual cards for the purpose of users to enter a date for a specific item on their portfolio (hence 'create' calender).
<br>

### Props (Type, Required, Default):
* Provided Date (String, true, '')
### Emitted Events:
* @date-updated
<br>
Triggered: When user edits the content of the calender
<br>
$event Payload: Vuetify date/month string ('YYYY-MM')

## CreateToolbar.vue
The CreateToolbar component is used to display a toolbar fixed to the top of the viewport with many customizable options taylored to the needs of /CreateComponents, but with universal use cases.
<br>

### Props (Type, Required, Default, Validator = N/A):

* Title (String, true, N/A)
* ExitAction (Function, true, N/A)
* DisableAddBtn (Boolean, false, false)
* OnAdd (Function, false, () => { throw new Error('Button Action Was Left Unassigned By Parent!') })
* AddBtnColor (String, false, 'success')
* ListLength (Number, false, N/A)
* DisabledAt (Number, false, N/A, passedValue => passedValue > 0)

### Slots (Description)
* Actions (Add custom actions such as buttons that are displayed on the far right of the toolbar)

## DialogBox.vue