from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField


class UserForm(FlaskForm):
    name = StringField('Your Great Name:')
    submit = SubmitField('Submit')
