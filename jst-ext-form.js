/*
 * Copyright (c) 2012-2014 Michal Perutka <michal.perutka@gmail.com>
 * 
 * This file is part of JSmalltalk, an implementation of the Smalltalk language 
 * that runs on top of the JavaScript runtime.
 * 
 * JSmalltalk is free software: you can redistribute it and/or modify it under the terms 
 * of the GNU General Public License as published by the Free Software Foundation, 
 * either version 3 of the License, or (at your option) any later version.
 *
 * JSmalltalk is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with JSmalltalk. 
 * If not, see <http://www.gnu.org/licenses/>.
 * --------------------------------------------------------------------------------------
 *
 * Depends on jst-ext-core, jst-ext-comp
 */

jst.currentJsFile = "jst-ext-form";

// *** CLASSES ***

jst.ExtObservable.subclass("ExtBasicForm", "", "", "", "Ext-form");
jst.ExtPanel.subclass("ExtFormPanel", "", "", "", "Ext-form");

jst.ExtBoxComponent.subclass("ExtFormField", "", "", "", "Ext-form");

jst.ExtFormField.subclass("ExtTextField", "", "", "", "Ext-form");
jst.ExtFormField.subclass("ExtHtmlEditor", "toolbar", "", "", "Ext-form");
jst.ExtFormField.subclass("ExtCheckbox", "", "", "", "Ext-form");
jst.ExtFormField.subclass("ExtCheckboxGroup", "", "", "", "Ext-form");
jst.ExtFormField.subclass("ExtHidden", "", "", "", "Ext-form");
jst.ExtFormField.subclass("ExtDisplayField", "", "", "", "Ext-form");
jst.ExtFormField.subclass("ExtCompositeField", "", "", "", "Ext-form");

jst.ExtTextField.subclass("ExtTextArea", "", "", "", "Ext-form");
jst.ExtTextField.subclass("ExtTriggerField", "", "", "", "Ext-form");
jst.ExtTextField.subclass("ExtPasswordField", "", "", "", "Ext-form");
jst.ExtTextField.subclass("ExtFileUploadField", "multiple", "", "", "Ext-form");

jst.ExtPanel.subclass("ExtFieldSet", "", "", "", "Ext-form");

jst.ExtTriggerField.subclass("ExtComboBox", "", "", "", "Ext-form");

jst.ExtDefaultListener.subclass("ExtFieldListener", "", "", "", "Ext-event");

//jst.ExtListener.subclass("ExtChangeListener", "", "", "", "Ext-event-form");
//jst.ExtListener.subclass("ExtSelectListener", "", "", "", "Ext-event-form");

jst.ExtWindow.subclass("ExtLoginDialog", "formPanel info user onLogin", "", "", "Ext-util");

// Form listeners

//*** ExtFieldListener ***

jst.ExtFieldListener.addMethod("changeHandler", "", "handlers", 
	"\t^ [:formField :newValue :oldValue |" +
	"\n\t\tself handlerBlock value: formField jstWrapper value: newValue value: oldValue]",
	null, "2013-06-22T19:28:59Z", "mp");

jst.ExtFieldListener.addMethod("selectHandler", "", "handlers", 
	"\t\"Fires when/before a list item is selected. " +
	"\n\tA record is the data record returned from the underlying store, " +
	"\n\ta number is the index of the selected item in the dropdown list\"" +
	"\n\t^ [:aComboBox :aRecord :aNumber | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taComboBox jstWrapper. " +
	"\n\t\t\tExtRecord wrap: aRecord. " +
	"\n\t\t\taNumber+1}]",
	null, "2013-06-22T19:33:15Z", "mp");

jst.ExtFieldListener.addMethod("beforeselectHandler", "", "handlers", 
	"\t^ self selectHandler",
	null, "2013-06-22T19:34:10Z", "mp");

jst.ExtFieldListener.addMethod("invalidHandler", "", "handlers", 
	"\t\"Fires after the field has been marked as invalid\"" +
	"\n\t^ [:field :msg | self handlerBlock " +
	"\n\t\tvalueWithPossibleArgs: {" +
	"\n\t\t\tfield jstWrapper." +
	"\n\t\t\tmsg \"The validation message\" }]",
	null, "2013-06-22T19:39:26Z", "mp");

/*
jst.ExtChangeListener.addMethod("handler", "", "accessing", 
	"\t^ [:formField :newValue :oldValue |" +
	"\n\t\tself handlerBlock value: formField jstWrapper value: newValue value: oldValue]",
	null, "2012-06-26T07:24:14Z", "mp");

jst.ExtSelectListener.addMethod("handler", "", "accessing", 
	"\t\"Fires when/before a list item is selected. " +
	"\n\tA record is the data record returned from the underlying store, " +
	"\n\ta number is the index of the selected item in the dropdown list\"" +
	"\n\t^ [:aComboBox :aRecord :aNumber | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taComboBox jstWrapper. " +
	"\n\t\t\tExtRecord wrap: aRecord. " +
	"\n\t\t\taNumber+1}]",
	null, "2013-01-22T15:44:41Z", "mp");

jst.ExtSelectListener._class.addMethod("events", "", "accessing", 
	"\t^ #(select beforeselect)",
	null, "2013-01-22T15:43:47Z", "mp");
*/

//*** ExtBasicForm *** 

jst.ExtBasicForm.addMethod("element", "", "accessing", 
	"\t^ ExtElement wrap: obj getEl",
	null, "2014-01-15T13:28:52Z", "mp");

jst.ExtBasicForm.addMethod("values:", "aDictionary", "accessing", 
	"\t\"Set values for fields in this form in bulk.\"" +
	"\n\tobj perform: #setValues with: aDictionary asJsObject",
	null, "2012-07-31T20:34:23Z", "mp");

jst.ExtBasicForm.addMethod("values", "", "accessing", 
	"\t\"Returns the fields in this form as an object with key/value pairs as they would be submitted using " +
	"\n\ta standard form submit. If multiple fields exist with the same name they are returned as an array." +
	"\n\tNote: The values are collected from all enabled HTML input elements within the form, not from the ExtField objects. " +
	"\n\tThis means that all returned values are Strings (or Arrays of Strings) and that the value can potentially " +
	"\n\tbe the emptyText of a field.\"" +
	"\n\t^ Dictionary on: (obj perform: #getValues)",
	null, "2012-07-31T20:36:53Z", "mp");

jst.ExtBasicForm.addMethod("dirtyValues", "", "accessing", 
	"\t\"Retrieves the fields in the form as a set of key/value pairs, using the getValue() method. " +
	"\n\tIf multiple fields exist with the same name they are returned as an array.\"" +
	"\n\t^ Dictionary on: (obj perform: #getFieldValues with: true)",
	null, "2013-09-16T08:00:42Z", "mp");

jst.ExtBasicForm.addMethod("items", "", "accessing", 
	"\t\"A MixedCollection containing all the Ext.form.Fields in this form.\"" +
	"\n\t^ ExtMixedCollection wrap: (obj at: #items)",
	null, "2013-09-16T08:03:13Z", "mp");

jst.ExtBasicForm.addMethod("findField:", "anObject", "accessing", 
	"\t\"Find a Ext.form.Field in this form. Specify either a id, dataIndex, name or hiddenName\"" +
	"\n\t^ (obj perform: #findField with: (anObject ifNotString: [anObject - 1])) jstWrapper",
	null, "2013-09-16T08:16:22Z", "mp");

jst.ExtBasicForm.addMethod("isDirty", "", "testing", 
	"\t\"Returns true if any fields in this form have changed from their original values." +
	"\n\tNote that if this BasicForm was configured with trackResetOnLoad then the Fields' original values " +
	"\n\tare updated when the values are loaded by #values: or #loadRecord.\"" +
	"\n\t^ obj perform: 'isDirty'",
	null, "2012-08-01T11:37:00Z", "mp");

jst.ExtBasicForm.addMethod("isValid", "", "validation", 
	"\t\"Returns true if client-side validation on the form is successful.\"" +
	"\n\t^ obj perform: #isValid",
	null, "2012-12-12T16:56:27Z", "mp");

jst.ExtBasicForm.addMethod("clearInvalid", "", "validation", 
	"\t\"Clears all invalid messages in this form.\"" +
	"\n\tobj perform: #clearInvalid",
	null, "2012-12-12T17:06:06Z", "mp");

jst.ExtBasicForm.addMethod("trackResetOnLoad", "", "accessing", 
	"\t^ self at: 'trackResetOnLoad' default: false",
	null, "2012-08-01T11:40:09Z", "mp");

jst.ExtBasicForm.addMethod("reset", "", "actions", 
	"\t\"Resets this form.\"" +
	"\n\tobj perform: 'reset'",
	null, "2012-08-01T12:39:09Z", "mp");

//*** ExtFormPanel *** 

jst.ExtFormPanel._class.addMethod("xtype", "", "accessing", "\t^ #form");

jst.ExtFormPanel.addMethod("form", "", "converting", "\t^ obj ifNotNil: [(obj perform: #getForm) jstWrapper]"); 

jst.ExtFormPanel.addMethod("createJsObject", "", "private", 
	"\tsuper createJsObject." +
	"\n\tExtBasicForm wrap: (obj perform: #getForm)",
	null, "2012-03-24T20:59:00Z", "mp");

jst.ExtFormPanel.addMethod("trackResetOnLoad:", "aBoolean", "form config", 
	"\t\"If set to true, #reset resets to the last loaded or #values: data instead of when the form was first created. Defaults to false.\"" +
	"\n\tself configAt: 'trackResetOnLoad' put: aBoolean",
	null, "2012-08-01T11:39:14Z", "mp");

jst.ExtFormPanel.addMethod("monitorValid:", "aBoolean", "accessing-config", 
	"\t\"If true, the form monitors its valid state client-side and regularly fires the clientvalidation event passing that state." +
	"\n\tWhen monitoring valid state, the FormPanel enables/disables any of its configured buttons which have been configured " +
	"\n\twith formBind: true depending on whether the form is valid or not. Defaults to false\"" +
	"\n\tself configAt: 'monitorValid' put: aBoolean",
	null, "2012-08-02T13:26:24Z", "mp");

jst.ExtFormPanel.addMethod("monitorValid", "", "accessing-config", 
	"\t^ self at: 'monitorValid' default: false",
	null, "2012-08-02T13:26:47Z", "mp");

jst.ExtFormPanel.addMethod("startMonitoring", "", "public", 
	"\t\"Starts monitoring of the valid state of this form. Usually this is done by passing the config option #monitorValid\"" +
	"\n\tobj perform: 'startMonitoring'",
	null, "2012-08-03T13:39:26Z", "mp");

jst.ExtFormPanel.addMethod("stopMonitoring", "", "public", 
	"\t\"Stops monitoring of the valid state of this form\"" +
	"\n\tobj perform: 'stopMonitoring'",
	null, "2012-08-03T13:40:03Z", "mp");

jst.ExtFormPanel.addMethod("labelAlign:", "aString", "accessing-config", 
	"\t\"The label alignment value used for the text-align specification for the container. " +
	"\n\tValid values are #left, #top or #right. This property cascades to child containers and can be overridden " +
	"\n\ton any child container (e.g., a fieldset can specify a different labelAlign for its fields).\"" +
	"\n\tself configAt: 'labelAlign' put: aString",
	null, "2012-08-03T21:09:11Z", "mp");

jst.ExtFormPanel.addMethod("labelAlign", "", "accessing-config", 
	"\t^ self at: 'labelAlign' default: #left",
	null, "2012-08-03T21:09:27Z", "mp");

jst.ExtFormPanel.addMethod("labelWidth:", "aNumber", "accessing-config", 
	"\t\"The width of labels in pixels. This property cascades to child containers and can be overridden " +
	"\n\ton any child container (e.g., a fieldset can specify a different labelWidth for its fields)\"" +
	"\n\tself configAt: #labelWidth put: aNumber",
	null, "2013-02-19T14:59:31Z", "mp");

jst.ExtFormPanel.addMethod("labelWidth", "", "accessing-config", 
	"\t^ self at: #labelWidth default: 100",
	null, "2013-02-19T14:59:48Z", "mp");

// *** ExtFormField  ***

jst.ExtFormField._class.addMethod("xtype", "", "accessing", "\t^ #field");

jst.ExtFormField._class.addMethod("jsClassName", "", "accessing", 
	"\t^ (self category name copyReplaceAll: '-' with: '.'), '.Field'",
	null, "2014-01-14T13:04:42Z", "mp");

jst.ExtFormField._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtFieldListener",
	null, "2013-06-22T20:49:18Z", "mp");

jst.ExtFormField.addMethod("createJsObject", "", "private", 
	"\tsuper createJsObject." +
	"\n\tobj perform: #originalValue with: self value",
	null, "2012-03-24T20:59:08Z", "mp");

jst.ExtFormField.addMethod("validateOnBlur:", "aBoolean", "accessing-config", "\tself configAt: #validateOnBlur put: aBoolean");

jst.ExtFormField.addMethod("originalValue", "", "accessing", "\t^ self at: #value get: #originalValue");
jst.ExtFormField.addMethod("startValue", "", "accessing", "\t^ self at: #value get: #startValue");

jst.ExtFormField.addMethod("validate", "", "processing", "\t^ obj perform: #validate");

jst.ExtFormField.addMethod("clearInvalid", "", "processing", "\tobj ifNotNil: [" +
	"\n\t\tobj perform: #clearInvalid]");

jst.ExtFormField.addMethod("markInvalid:", "aString", "processing", 
	"\t\"Display an error message associated with this field, using msgTarget to determine " +
	"\n\thow to display the message and applying invalidClass to the field's UI element." +
	"\n\tNote: this method does not cause the Field's validate method to return false " +
	"\n\tif the value does pass validation. So simply marking a Field as invalid will not prevent " +
	"\n\tsubmission of forms submitted with the Ext.form.Action.Submit.clientValidation option set.\"" +
	"\n\tobj perform: #markInvalid with: aString",
	null, "2013-09-10T12:56:59Z", "mp");

jst.ExtFormField.addMethod("reset", "", "initialization", "\t^ obj perform: #reset");

/*
jst.ExtFormField.addMethod("resetContents:", "anObject", "initialization", 
	"\tself reset; rawValue: anObject." +
	"\n\tobj perform: #originalValue with: anObject." +
	"\n\tobj perform: #startValue with: anObject");

jst.ExtFormField.addMethod("resetContents:", "anObject", "initialization", 
	"\tself at: #value by: #originalValue put: anObject." +
	"\n\tobj ifNotNil: [" +
	"\n\t\tself suspendEvents." +
	"\n\t\tself reset." +
	"\n\t\tself resumeEvents]",
	null, "2011-10-12T09:00:28Z", "mp");
*/
jst.ExtFormField.addMethod("resetContents:", "anObject", "initialization", 
	"\t\"see #value:\"" +
	"\n\tself at: #value by: #originalValue put: (anObject ifNil: '')." +
	"\n\tobj ifNotNil: [" +
	"\n\t\tself suspendEvents." +
	"\n\t\tself reset." +
	"\n\t\tself resumeEvents]",
	null, "2013-04-25T08:57:27Z", "mp");

jst.ExtFormField.addMethod("contents:", "anObject", "accessing", 
	"\tself resetContents: anObject",
	null, "2012-01-06T21:32:46Z", "mp");

jst.ExtFormField.addMethod("contents", "", "accessing", "\t^ self value"); 

jst.ExtFormField.addMethod("rawValue", "", "accessing", "\t^ self at: #value get: #getRawValue");

jst.ExtFormField.addMethod("rawValue:", "anObject", "accessing", 
	"\t self at: #value by: #setRawValue put: anObject",
	null, "2011-10-12T09:00:21Z", "mp");

jst.ExtFormField.addMethod("value", "", "accessing", "\t^ self at: #value get: #getValue");

/*
jst.ExtFormField.addMethod("value:", "anObject", "accessing", 
	"\t self at: #value by: #setValue put: anObject",
	null, "2011-10-12T09:00:34Z", "mp");
*/
jst.ExtFormField.addMethod("value:", "anObject", "accessing", 
	"\t\"An object cannot be nil as #getValue converts null to empty string and #isDirty returns true\"" +
	"\n\t self at: #value by: #setValue put: (anObject ifNil: '')",
	null, "2013-04-25T08:56:38Z", "mp");

jst.ExtFormField.addMethod("isDirty", "", "testing", 
	"\t\"Returns true if the value of this Field has been changed from its original value. " +
	"\n\tWill return false if the field is disabled or has not been rendered yet." +
	"\n\tNote that if the owning form was configured with 'trackResetOnLoad: true' then the original value is updated" +
	"\n\twhen the values are loaded by ExtBasicForm>>values:\"" +
	"\n\t^ obj perform: #isDirty",
	null, "2013-01-28T15:36:02Z", "mp");

jst.ExtFormField.addMethod("validEvent", "", "events", 
	"\t\"Fires after the field has been validated with no errors." +
	"\n\tReturned handler block or instance of ExtDefaultListener is installed on initialization\"",
	null, "2013-06-20T08:38:22Z", "mp");

jst.ExtFormField.addMethod("invalidEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtFormField.addMethod("focusEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtFormField.addMethod("blurEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtFormField.addMethod("specialkeyEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");

jst.ExtFormField.addMethod("changeEvent", "", "events", 
	"\t\"Fires just before the field blurs if the field value has changed." +
	"\n\tReturned handler block or instance of ExtChangeListener is installed on initialization\"",
	null, "2012-06-26T07:21:55Z", "mp");

jst.ExtFormField.addMethod("name:", "aString", "accessing-config", 
	"\t\"The field's HTML name attribute (defaults to ''). " +
	"\n\tNote: this property must be set if this field is to be automatically included with form submit().\"" +
	"\n\tself configAt: 'name' put: aString",
	null, "2012-06-28T20:55:22Z", "mp");

jst.ExtFormField.addMethod("name", "", "accessing", 
	"\t\"Returns the name or hiddenName attribute of the field if available.\"" +
	"\n\t^ self at: 'name' get: 'getName' default: ''",
	null, "2012-06-28T20:58:31Z", "mp");

jst.ExtFormField.addMethod("inputType:", "aString", "accessing-config", 
	"\t\"The type attribute for input fields -- e.g. #radio, #text, #password, #file (defaults to #text). " +
	"\n\tThe types #file and #password must be used to render those field types currently -- there are " +
	"\n\tno separate Ext components for those. Note that if you use inputType: #file, emptyText is not " +
	"\n\tsupported and should be avoided.\"" +
	"\n\tself configAt: #inputType put: aString",
	null, "2012-12-07T08:28:43Z", "mp");

jst.ExtFormField.addMethod("inputType", "", "accessing-config", 
	"\t^ self at: #inputType default: #text",
	null, "2012-12-07T08:29:53Z", "mp");

jst.ExtFormField.addMethod("tabIndex:", "aNumber", "accessing-config", 
	"\t\"The tabIndex for this field. Note this only applies to fields that are rendered, not those which are built via applyTo\"" +
	"\n\tself configAt: #tabIndex put: aNumber",
	null, "2014-05-01T21:03:06Z", "mp");

jst.ExtFormField.addMethod("tabIndex", "", "accessing-config", 
	"\t^ self at: #tabIndex",
	null, "2014-05-01T21:04:52Z", "mp");

jst.ExtFormField.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\tself name ifNotNilDo: [:n |" +
	"\n\t\taStream nextPutAll: ' '; print: n]",
	null, "2013-10-23T09:13:18Z", "mp");

//*** ExtTextField  ***

jst.ExtTextField._class.addMethod("xtype", "", "accessing", "\t^ #textfield");

jst.ExtTextField.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself blankText: 'Tato položka je povinná'",
	null, "2012-06-29T09:12:29Z", "mp");

jst.ExtTextField.addMethod("selectText", "", "accessing", "\tobj perform: #focus with: true with: 20");

jst.ExtTextField.addMethod("blankText:", "aString", "validation", 
	"\t\"The error text to display if the allowBlank validation fails\"" +
	"\n\tself configAt: 'blankText' put: aString",
	null, "2012-06-29T09:02:29Z", "mp");

jst.ExtTextField.addMethod("blankText", "", "validation", 
	"\t^ self at: 'blankText' default: 'This field is required'",
	null, "2012-06-29T09:02:50Z", "mp");

jst.ExtTextField.addMethod("allowBlank:", "aBoolean", "validation", 
	"\t\"Specify false to validate that the value's length is > 0\"" +
	"\n\tself configAt: 'allowBlank' put: aBoolean",
	null, "2012-06-29T09:02:59Z", "mp");

jst.ExtTextField.addMethod("allowBlank", "", "validation", 
	"\t^ self at: 'allowBlank' default: true",
	null, "2012-06-29T09:03:18Z", "mp");

jst.ExtTextField.addMethod("validator:", "aBlock", "accessing", 
	"\t\"A custom validation function to be called during field validation (validateValue). " +
	"\n\tIf specified, this function will be called first, allowing the developer to override the default validation process." +
	"\n\tThis function will be passed the following Parameters: The current field value" +
	"\n\tThis function is to return: " +
	"\n\t\ttrue if the value is valid or" +
	"\n\t\tan error message if the value is invalid\"" +
	"\n\tself at: #validator put: aBlock",
	null, "2013-09-10T14:37:07Z", "mp");

//*** ExtPasswordField ***

jst.ExtPasswordField.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself inputType: #password",
	null, "2012-12-07T08:32:18Z", "mp");

//*** ExtTextArea  ***

jst.ExtTextArea._class.addMethod("xtype", "", "accessing", "\t^ #textarea");

jst.ExtTextArea.addMethod("grow:", "aBoolean", "accessing-config", 
	"\t\"true if this field should automatically grow and shrink to its content (defaults to false)\"" +
	"\n\tself configAt: 'grow' put: aBoolean",
	null, "2012-08-01T08:13:57Z", "mp");

jst.ExtTextArea.addMethod("grow", "", "accessing-config", 
	"\t^ self at: 'grow' default: false",
	null, "2012-08-01T08:14:20Z", "mp");

//*** ExtHidden ***

jst.ExtHidden._class.addMethod("xtype", "", "accessing", 
	"\t^ 'hidden'",
	null, "2012-08-03T19:46:55Z", "mp");

//*** ExtDisplayField ***

jst.ExtDisplayField._class.addMethod("xtype", "", "accessing", 
	"\t^ 'displayfield'",
	null, "2012-08-14T15:00:21Z", "mp");

jst.ExtDisplayField.addMethod("htmlEncode:", "aBoolean", "accessing-config", 
	"\t\"false to skip HTML-encoding the text when rendering it (defaults to false). This might be useful " +
	"\n\tif you want to include tags in the field's innerHTML rather than rendering them as string literals per the default logic.\"" +
	"\n\tself configAt: 'htmlEncode' put: aBoolean",
	null, "2012-08-12T17:35:52Z", "mp");

jst.ExtDisplayField.addMethod("htmlEncode", "", "accessing-config", 
	"\t^ self at: 'htmlEncode' default: false",
	null, "2012-08-12T17:36:11Z", "mp");

//*** ExtHtmlEditor  ***

jst.ExtHtmlEditor._class.addMethod("xtype", "", "accessing", "\t^ #htmleditor");

jst.ExtHtmlEditor.addMethod("defaultValue:", "aString", "accessing-config", 
	"\t\"A default value to be put into the editor to resolve focus issues\"" +
	"\n\tself configAt: 'defaultValue' put: aString",
	null, "2012-08-16T13:22:04Z", "mp");

jst.ExtHtmlEditor.addMethod("defaultValue", "", "accessing-config", 
	"\t^ self at: 'defaultValue'",
	null, "2012-08-14T21:07:15Z", "mp");

jst.ExtHtmlEditor.addMethod("enableFont:", "aBoolean", "accessing-config", 
	"\t\"Enable font selection. Not available in Safari.\"" +
	"\n\tself configAt: 'enableFont' put: aBoolean",
	null, "2012-08-15T07:25:15Z", "mp");

jst.ExtHtmlEditor.addMethod("enableFont", "", "accessing-config", 
	"\t^ self at: 'enableFont' default: true",
	null, "2012-08-15T07:25:30Z", "mp");

jst.ExtHtmlEditor.addMethod("enableFontSize:", "aBoolean", "accessing-config", 
	"\t\"Enable the increase/decrease font size buttons\"" +
	"\n\tself configAt: 'enableFontSize' put: aBoolean",
	null, "2012-08-15T07:53:11Z", "mp");

jst.ExtHtmlEditor.addMethod("enableFontSize", "", "accessing-config", 
	"\t^ self at: 'enableFontSize' default: true",
	null, "2012-08-15T07:53:01Z", "mp");

jst.ExtHtmlEditor.addMethod("toolbar", "", "accessing", 
	"\t\"Returns the editor's toolbar. This is only available after the editor has been rendered.\"" +
	"\n\t^ toolbar ifNil: [" +
	"\n\t\ttoolbar := ExtToolbar new  wrap: (obj perform: #getToolbar)]",
	null, "2013-03-03T21:02:50Z", "mp");

jst.ExtHtmlEditor.addMethod("insertAtCursor:", "aString", "as yet unclassified", 
	"\t\"Inserts the passed text at the current cursor position. Note: the editor must be initialized and activated to insert text.\"" +
	"\n\tobj perform: #insertAtCursor with: aString",
	null, "2014-04-30T08:25:32Z", "mp");

//*** ExtCheckboxGroup ***

jst.ExtCheckboxGroup.addMethod("allowBlank:", "aBoolean", "accessing-config", 
	"\t\"False to validate that at least one item in the group is checked (defaults to true)." +
	"\n\tIf no items are selected at validation time, #blankText will be used as the error text.\"" +
	"\n\tself configAt: 'allowBlank' put: aBoolean",
	null, "2012-08-02T09:10:05Z", "mp");

jst.ExtCheckboxGroup.addMethod("allowBlank", "", "accessing-config", 
	"\t^ self at: 'allowBlank' default: true",
	null, "2012-08-02T09:10:35Z", "mp");

jst.ExtCheckboxGroup.addMethod("blankText:", "aString", "accessing-config", 
	"\t\"Error text to display if the allowBlank validation fails\"" +
	"\n\tself configAt: 'blankText' put: aString",
	null, "2012-08-02T09:11:56Z", "mp");

jst.ExtCheckboxGroup.addMethod("blankText", "", "accessing-config", 
	"\t^ self at: 'blankText' default: 'You must select at least one item in this group'",
	null, "2012-08-02T09:12:23Z", "mp");

jst.ExtCheckboxGroup.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself blankText: 'Musíte zaškrtnout alespoň jednu položku.'",
	null, "2012-08-02T09:13:24Z", "mp");

jst.ExtCheckboxGroup.addMethod("columns:", "aNumber", "accessing-config", 
	"\t\"Specifies the number of columns to use when displaying grouped checkbox/radio controls using automatic layout. " +
	"\n\t" +
	"\n\tThe default value is 'auto' which means, that the controls will be rendered one per column on one row " +
	"\n\tand the width of each column will be evenly distributed based on the width of the overall field container." +
	"\n\tIf you specific a number (e.g., 3) that number of columns will be created and the contained controls " +
	"\n\twill be automatically distributed based on the value of #vertical.\"" +
	"\n\tself configAt: 'columns' put: aNumber",
	null, "2012-08-02T09:22:38Z", "mp");

jst.ExtCheckboxGroup.addMethod("columns", "", "accessing-config", 
	"\t^ self at: 'columns' default: 'auto'",
	null, "2012-08-02T09:18:25Z", "mp");

jst.ExtCheckboxGroup.addMethod("columnWidths:", "anArray", "accessing-config", 
	"\t\"Specifies widths of columns to use when displaying grouped checkbox/radio controls using automatic layout. " +
	"\n\t" +
	"\n\tYou can also specify an array of column widths, mixing integer (fixed width) and float (percentage width) values as needed " +
	"\n\t(e.g., [100, .25, .75]). Any integer values will be rendered first, then any float values will be calculated as a percentage " +
	"\n\tof the remaining space. Float values do not have to add up to 1 (100%) although if you want the controls " +
	"\n\tto take up the entire field container you should do so.\"" +
	"\n\tself configAt: 'columns' put: anArray",
	null, "2012-08-02T09:22:53Z", "mp");

jst.ExtCheckboxGroup.addMethod("items:", "anArray", "accessing-config", 
	"\t\"An Array of Checkboxes to arrange in the group.\"" +
	"\n\tself configAt: 'items' put: anArray",
	null, "2012-08-02T09:24:11Z", "mp");

jst.ExtCheckboxGroup.addMethod("items", "", "accessing-config", 
	"\t^ config at: 'items' ifAbsent: #()",
	null, "2012-08-02T09:25:17Z", "mp");

jst.ExtCheckboxGroup.addMethod("vertical:", "aBoolean", "accessing-config", 
	"\t\"True to distribute contained controls across columns, completely filling each column top to bottom " +
	"\n\tbefore starting on the next column. The number of controls in each column will be automatically calculated " +
	"\n\tto keep columns as even as possible. The default value is false, so that controls will be added to columns one at a time, " +
	"\n\tcompletely filling each row left to right before starting on the next row.\"" +
	"\n\tself configAt: 'vertical' put: aBoolean",
	null, "2012-08-02T09:26:20Z", "mp");

jst.ExtCheckboxGroup.addMethod("vertical", "", "accessing-config", 
	"\t^ self at: 'vertical' default: false",
	null, "2012-08-02T09:32:21Z", "mp");

jst.ExtCheckboxGroup._class.addMethod("xtype", "", "accessing", 
	"\t^ #checkboxgroup",
	null, "2012-08-02T09:06:56Z", "mp");

//*** ExtCheckbox ***

jst.ExtCheckbox._class.addMethod("xtype", "", "accessing", 
	"\t^ #checkbox",
	null, "2012-08-02T08:59:18Z", "mp");

jst.ExtCheckbox.addMethod("inputValue:", "anObject", "accessing-config", 
	"\t\"The value that should go into the generated input element's value attribute\"" +
	"\n\tself configAt: #inputValue put: anObject",
	null, "2013-07-03T19:38:18Z", "mp");

jst.ExtCheckbox.addMethod("boxLabel:", "aString", "accessing-config", 
	"\t\"The text that appears beside the checkbox\"" +
	"\n\tself configAt: 'boxLabel' put: aString",
	null, "2012-08-02T11:22:05Z", "mp");

jst.ExtCheckbox.addMethod("boxLabel", "", "accessing-config", 
	"\t^ self at: 'boxLabel'",
	null, "2012-08-02T11:22:23Z", "mp");

jst.ExtCheckbox.addMethod("checked:", "aBoolean", "accessing", 
	"\t\"true if the checkbox should render initially checked (defaults to false)." +
	"\n\tOn rendered component sets the checked state of the checkbox, fires the 'check' event, and calls a handler (if configured)." +
	"\n\tThe following values will check the checkbox: true, 'true', '1', or 'on'. Any other value will uncheck the checkbox.\"" +
	"\n\tself at: 'checked' by: 'setValue' put: aBoolean",
	null, "2012-08-02T11:26:18Z", "mp");

jst.ExtCheckbox.addMethod("checked", "", "accessing", 
	"\t^ self at: 'checked' get: 'getValue' default: false",
	null, "2012-08-02T11:26:54Z", "mp");

jst.ExtCheckbox.addMethod("checkEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtToggleListener is installed on initialization. " +
	"\n\tFires when the checkbox is checked or unchecked, the second parameter is the new checked value\"",
	null, "2013-01-04T14:45:05Z", "mp");

//*** ExtComboBox ***

jst.ExtComboBox._class.addMethod("xtype", "", "accessing", 
	"\t^ #combo",
	null, "2012-08-02T13:10:07Z", "mp");

jst.ExtComboBox.addMethod("typeAhead:", "aBoolean", "accessing-config", 
	"\t\"true to populate and autoselect the remainder of the text being typed after a configurable delay " +
	"\n\t(#typeAheadDelay) if it matches a known value\"" +
	"\n\tself configAt: 'typeAhead' put: aBoolean",
	null, "2012-08-02T19:16:02Z", "mp");

jst.ExtComboBox.addMethod("typeAhead", "", "accessing-config", 
	"\t^ self at: 'typeAhead' default: false",
	null, "2012-08-02T19:13:16Z", "mp");

jst.ExtComboBox.addMethod("typeAheadDelay:", "aNumber", "accessing-config", 
	"\t\"The length of time in milliseconds to wait until the typeahead text is displayed if typeAhead = true\"" +
	"\n\tself configAt: 'typeAheadDelay' put: aNumber",
	null, "2012-08-02T19:15:27Z", "mp");

jst.ExtComboBox.addMethod("typeAheadDelay", "", "accessing-config", 
	"\t^ self at: 'typeAheadDelay' default: 250",
	null, "2012-08-02T19:15:44Z", "mp");

jst.ExtComboBox.addMethod("valueField:", "aString", "accessing-config", 
	"\t\"The underlying data value name to bind to this ComboBox (defaults to undefined if mode = 'remote' " +
	"\n\tor 'field2' if transforming a select or if the field name is autogenerated based on the store configuration)." +
	"\n\tNote: use of a valueField requires the user to make a selection in order for a value to be mapped. " +
	"\n\tSee also #hiddenName, #hiddenValue, and #displayField.\"" +
	"\n\tself configAt: 'valueField' put: aString",
	null, "2012-08-02T19:19:08Z", "mp");

jst.ExtComboBox.addMethod("valueField", "", "accessing-config", 
	"\t^ self at: 'valueField' default: (self mode = #remote ifFalse: 'field2')",
	null, "2012-08-02T19:29:39Z", "mp");

jst.ExtComboBox.addMethod("displayField:", "aString", "accessing-config", 
	"\t\"The underlying data field name to bind to this ComboBox (defaults to undefined if mode = 'remote' " +
	"\n\tor 'field1' if transforming a select or if the field name is autogenerated based on the store configuration)." +
	"\n\tSee also #valueField." +
	"\n\tNote: if using a ComboBox in an Editor Grid a renderer will be needed to show the displayField when the editor is not active.\"" +
	"\n\tself configAt: 'displayField' put: aString",
	null, "2012-08-02T19:23:17Z", "mp");

jst.ExtComboBox.addMethod("displayField", "", "accessing-config", 
	"\t^ self at: 'displayField' default: (self mode = #remote ifFalse: 'field1')",
	null, "2012-08-02T19:28:05Z", "mp");

jst.ExtComboBox.addMethod("mode:", "aString", "accessing-config", 
	"\t\"Acceptable values are:" +
	"\n\t\t#remote: Automatically loads the store the first time the trigger is clicked. If you do not want the store to be " +
	"\n\t\t\tautomatically loaded the first time the trigger is clicked, set to 'local' and manually load the store. " +
	"\n\t\t\tTo force a requery of the store every time the trigger is clicked see lastQuery." +
	"\n\t\t#local: ComboBox loads local data\"" +
	"\n\tself configAt: 'mode' put: aString",
	null, "2012-08-02T19:38:50Z", "mp");

jst.ExtComboBox.addMethod("mode", "", "accessing-config", 
	"\t^ self at: 'mode' default: #remote",
	null, "2012-08-02T19:41:58Z", "mp");

jst.ExtComboBox.addMethod("lazyRender:", "aBoolean", "accessing-config", 
	"\t\"true to prevent the ComboBox from rendering until requested; should always be used " +
	"\n\twhen rendering into an Ext.Editor (e.g. Grids).\"" +
	"\n\tself configAt: 'lazyRender' put: aBoolean",
	null, "2012-08-03T08:33:27Z", "mp");

jst.ExtComboBox.addMethod("lazyRender", "", "accessing-config", 
	"\t^ self at: 'lazyRender' default: false",
	null, "2012-08-03T08:33:42Z", "mp");

jst.ExtComboBox.addMethod("store:", "anExtStoreOrArray", "accessing-config", 
	"\t\"The data source to which this combo is bound (defaults to undefined). Acceptable values for this property are:" +
	"\n\t\tany Store subclass" +
	"\n\t\tan Array : Arrays will be converted to a ExtArrayStore internally, automatically generating field names " +
	"\n\t\t\tto work with all data components." +
	"\n\t\t\t1-dimensional array : (e.g., ['Foo','Bar'])" +
	"\n\t\t\t\tA 1-dimensional array will automatically be expanded (each array item will be used " +
	"\n\t\t\t\tfor both the combo valueField and displayField)" +
	"\n\t\t\t2-dimensional array : (e.g., [['f','Foo'],['b','Bar']])" +
	"\n\t\t\t\tFor a multi-dimensional array, the value in index 0 of each item will be assumed to be " +
	"\n\t\t\t\tthe combo valueField, while the value at index 1 is assumed to be the combo displayField.\"" +
	"\n\tself configAt: 'store' put: anExtStoreOrArray",
	null, "2012-08-03T08:44:47Z", "mp");

jst.ExtComboBox.addMethod("store", "", "accessing", 
	"\t^ (self at: 'store' get: 'getStore') jstWrapper",
	null, "2012-08-03T08:45:00Z", "mp");

jst.ExtComboBox.addMethod("triggerAction:", "aString", "accessing-config", 
	"\t\"The action to execute when the trigger is clicked." +
	"\n\t\t#query: run the query using the raw value." +
	"\n\t\t#all: run the query specified by the allQuery config option" +
	"\n\tSee also queryParam.\"" +
	"\n\tself configAt: 'triggerAction' put: aString",
	null, "2012-08-03T11:13:51Z", "mp");

jst.ExtComboBox.addMethod("triggerAction", "", "accessing-config", 
	"\t^ self at: 'triggerAction' default: #query",
	null, "2012-08-03T11:14:25Z", "mp");

jst.ExtComboBox.addMethod("forceSelection:", "aBoolean", "accessing-config", 
	"\t\"true to restrict the selected value to one of the values in the list, false to allow the user " +
	"\n\tto set arbitrary text into the field\"" +
	"\n\tself configAt: 'forceSelection' put: aBoolean",
	null, "2012-08-03T21:35:04Z", "mp");

jst.ExtComboBox.addMethod("forceSelection", "", "accessing-config", 
	"\t^ self at: 'forceSelection' default: false",
	null, "2012-08-03T21:35:28Z", "mp");

jst.ExtComboBox.addMethod("selectOnFocus:", "aBoolean", "accessing-config", 
	"\t\"true to select any existing text in the field immediately on focus. Only applies when editable = true\"" +
	"\n\tself configAt: 'selectOnFocus' put: aBoolean",
	null, "2012-08-22T20:42:46Z", "mp");

jst.ExtComboBox.addMethod("selectOnFocus", "", "accessing-config", 
	"\t^ self at: 'selectOnFocus' default: false",
	null, "2012-08-22T20:43:08Z", "mp");

jst.ExtComboBox.addMethod("hiddenName:", "aString", "accessing-config", 
	"\t\"If specified, a hidden form field with this name is dynamically generated to store the field's data value " +
	"\n\t(defaults to the underlying DOM element's name). Required for the combo's value to automatically post " +
	"\n\tduring a form submission. See also valueField.\"" +
	"\n\tself configAt: 'hiddenName' put: aString",
	null, "2012-08-22T21:26:20Z", "mp");

jst.ExtComboBox.addMethod("hiddenName", "", "accessing-config", 
	"\t^ self at: 'hiddenName'",
	null, "2012-08-22T21:26:41Z", "mp");

jst.ExtComboBox.addMethod("selectEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtSelectListener is installed on initialization " +
	"\n\tand fires when a list item is selected.\"",
	null, "2013-01-22T15:46:54Z", "mp");

jst.ExtComboBox.addMethod("beforeselectEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtSelectListener is installed on initialization " +
	"\n\tand fires before a list item is selected. Return false to cancel the selection.\"",
	null, "2013-01-22T15:47:32Z", "mp");

jst.ExtComboBox.addMethod("valueNotFoundText:", "aString", "accessing", 
	"\t\"When using a name/value combo, if the value passed to setValue is not found in the store, " +
	"\n\tvalueNotFoundText will be displayed as the field text if defined (defaults to undefined). " +
	"\n\tIf this default text is used, it means there is no value set and no validation will occur on this field.\"" +
	"\n\tself at: #valueNotFoundText put: aString",
	null, "2013-09-17T12:26:54Z", "mp");

jst.ExtComboBox.addMethod("valueNotFoundText", "", "accessing", 
	"\t^ self at: #valueNotFoundText",
	null, "2013-09-17T12:27:26Z", "mp");

//*** ExtFieldSet ***

jst.ExtFieldSet._class.addMethod("xtype", "", "accessing", 
	"\t^ 'fieldset'",
	null, "2012-08-17T20:14:32Z", "mp");

//*** ExtCompositeField ***

jst.ExtCompositeField.addMethod("items:", "anArray", "accessing-config", 
	"\tself configAt: 'items' put: anArray",
	null, "2012-08-17T20:37:25Z", "mp");

jst.ExtCompositeField._class.addMethod("xtype", "", "accessing", 
	"\t^ 'compositefield'",
	null, "2012-08-17T20:26:15Z", "mp");

jst.ExtCompositeField.addMethod("defaults", "", "accessing-config", 
	"\t^ config at: 'defaults' ifAbsentPut: [Dictionary new]",
	null, "2012-08-18T14:32:11Z", "mp");

jst.ExtCompositeField.addMethod("defaultAt:put:", "key anObject", "accessing-config", 
	"\tself defaults at: key put: anObject",
	null, "2012-08-18T14:32:20Z", "mp");

jst.ExtCompositeField.addMethod("defaults:", "aDictionary", "accessing-config", 
	"\t\"Any default properties to assign to the child fields.\"" +
	"\n\tself configAt: 'defaults' put: aDictionary",
	null, "2012-08-18T14:33:17Z", "mp");

//*** ExtLoginDialog ***

jst.ExtLoginDialog.addMethod("initialize", "", "initialization", 
	"\tsuper initialize " +
	"\n\t\ttitle: 'Přihlášení';" +
	"\n\t\twidth: 340;" +
	"\n\t\theight: 180;" +
	"\n\t\tresizable: false;" +
	"\n\t\tmodal: true;" +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (formPanel := ExtFormPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tpadding: 5;" +
	"\n\t\t\tcls: 'x-panel-mc';" +
	"\n\t\t\tadd: (ExtPanel new border: false; padding: '0 0 10 0';" +
	"\n\t\t\t\tcontents: 'Přihlaste se do aplikace Vaším uživatelským jménem a heslem:');" +
	"\n\t\t\tadd: (user := ExtTextField new name: 'name'; fieldLabel: 'Jméno'; allowBlank: false; anchor: '100%');" +
	"\n\t\t\tadd: (ExtPasswordField new name: 'password'; fieldLabel: 'Heslo'; allowBlank: false; anchor: '100%';" +
	"\n\t\t\t\ton: #specialkey do: [:field :ev | ev enterPressed ifTrue: [self login]]);" +
	"\n\t\t\tadd: (info := ExtPanel new border: false; padding: '5 0 0 0'; height: 20; style: 'color: red');" +
	"\n\t\t\tbuttons: {" +
	"\n\t\t\t\tExtButton new text: 'Přihlásit'; formBind: true; on: #click do: [self login]. " +
	"\n\t\t\t\tExtButton new text: 'Storno'; on: #click do: [self close]};" +
	"\n\t\t\tmonitorValid: false)",
	null, "2012-12-13T15:22:42Z", "mp");

jst.ExtLoginDialog.addMethod("login", "", "private", 
	"\t|dict |" +
	"\n\tformPanel form isValid ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\t[dict := formPanel form values. " +
	"\n\t\tonLogin valueWithPossibleArgs: {dict at: #name. dict at: #password. self}. " +
	"\n\t\tself close] on: Error do: [:err | info contents: err messageText translated]",
	null, "2012-12-12T17:10:25Z", "mp");

jst.ExtLoginDialog.addMethod("showEvent", "", "events", 
	"\t^ [user focus]",
	null, "2012-12-12T16:50:17Z", "mp");

jst.ExtLoginDialog.addMethod("onLogin:", "aBlock", "accessing", 
	"\tonLogin := aBlock",
	null, "2012-12-07T09:20:56Z", "mp");

//*** ExtFileUploadField ***

jst.ExtFileUploadField._class.addMethod("xtype", "", "accessing", 
	"\t^ 'fileuploadfield'",
	null, "2013-06-04T14:38:25Z", "mp");

jst.ExtFileUploadField.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tmultiple := false",
	null, "2013-06-19T07:33:26Z", "mp");

jst.ExtFileUploadField.addMethod("multiple:", "aBoolean", "accessing-config", 
	"\tmultiple := aBoolean",
	null, "2013-06-19T07:34:09Z", "mp");

jst.ExtFileUploadField.addMethod("renderEvent", "", "events", 
	"\t^ [multiple ifTrue: [self fileInput dom attributeAt: #multiple put: '']]",
	null, "2013-06-19T07:38:54Z", "mp");

jst.ExtFileUploadField.addMethod("buttonText:", "aString", "accessing-config", 
	" \t\"The button text to display on the upload button.  Note that if you supply a value for #button, the ExtButton>>text" +
	"\n\tvalue will be used instead if available.\"" +
	"\n\tself configAt: #buttonText put: aString",
	null, "2013-06-04T15:11:32Z", "mp");

jst.ExtFileUploadField.addMethod("buttonText", "", "accessing", 
	"\t^ self at: #buttonText default: 'Browse...'",
	null, "2013-06-04T15:12:35Z", "mp");

jst.ExtFileUploadField.addMethod("buttonOnly:", "aBoolean", "accessing-config", 
	"\t\"True to display the file upload field as a button with no visible text field.  " +
	"\n\tIf true, all inherited TextField members will still be available.\"" +
	"\n\tself configAt: #buttonOnly put: aBoolean",
	null, "2013-06-04T15:14:15Z", "mp");

jst.ExtFileUploadField.addMethod("buttonOnly", "", "accessing", 
	"\t^ self at: #buttonOnly default: false",
	null, "2013-06-04T15:14:56Z", "mp");

jst.ExtFileUploadField.addMethod("buttonOffset:", "aNumber", "accessing-config", 
	"\t\"The number of pixels of space reserved between the button and the text field. " +
	"\n\tNote that this only applies if #buttonOnly = false.\"" +
	"\n\tself configAt: #buttonOffset put: aNumber",
	null, "2013-06-04T15:16:56Z", "mp");

jst.ExtFileUploadField.addMethod("buttonOffset", "", "accessing", 
	"\t^ self at: #buttonOffset default: 3",
	null, "2013-06-04T15:17:36Z", "mp");

jst.ExtFileUploadField.addMethod("button:", "anExtButton", "accessing-config", 
	"\t\"A standard ExtButton config object.\"" +
	"\n\tself configAt: #buttonCfg put: anExtButton config",
	null, "2013-06-04T15:20:41Z", "mp");

jst.ExtFileUploadField.addMethod("button", "", "accessing", 
	"\t^ (self at: #button) ifNotNilDo: [:b | " +
	"\n\t\tExtButton wrap: b]",
	null, "2013-09-19T07:01:16Z", "mp");

jst.ExtFileUploadField.addMethod("fileInput", "", "accessing", 
	"\t^ obj ifNotNil: [" +
	"\n\t\tExtElement on: (obj at: #fileInput)]",
	null, "2013-06-06T16:44:24Z", "mp");

jst.ExtFileUploadField.addMethod("files", "", "accessing", function (){
	return this._obj.fileInput ? jst.FSFileList.wrap_(this._obj.fileInput.dom.files) : jst.nil;
},
	null, "2013-06-06T20:28:42Z", "mp");
