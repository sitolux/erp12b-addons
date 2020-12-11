# -*- coding: utf-8 -*-
# Copyright 2014-now Equitania Software GmbH - Pforzheim - Germany
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

{
    'name': 'MyOdoo Copy Clipboard',
    'license': 'AGPL-3',
    'version': '1.0.4',
    'author': 'Equitania Software GmbH',
    'website': 'https://www.myodoo.de',
    'depends': ['base_setup'],
    'category': 'General Improvements',
    'images': [
        #'images/main_1.png',
	    #'images/main_screenshot.png',
	],
    'description': """Copies string value to clipboard on mouse click""",
    'summary': 'Copies string value to clipboard on mouse click',

    'data': [
        #"security/ir.model.access.csv"
        "views/assets.xml",
        "views/eq_clipboard_javascript.xml",

    ],
    'demo': [],
    'css': ['base.css'],
    'installable': True,
    'auto_install': False,
}
