import dash
import datetime
import dash_core_components as dcc
import dash_html_components as html
import dash_table
import os
import pandas as pd
import requests
import plotly.graph_objs as go
from dash.dependencies import Output, Input, State
from dateutil.relativedelta import relativedelta


df = pd.read_csv("data/bop_processed.csv")
df.drop(columns="Unnamed: 0", inplace=True)
df['Date'] = df['date']
cols = list(df.columns)
cols = [cols[-1]] + cols[:-1]
df = df[cols]
df['date'] = pd.to_datetime(df['date'])
start = datetime.datetime.today() - relativedelta(years=5)
end = datetime.datetime.today()
mask = (df['date'] > start) & (df['date'] <= end)
df_sub = df.loc[mask]


def generate_balance_table(input_val):
    return html.Div([
            dash_table.DataTable(
                data=df_sub[input_val].to_dict('records'),
                columns=[{'id': c, 'name': c} for c in df_sub[input_val].drop(columns=['date']).columns]
            )  
        ], className="six columns", style={'height': '1000px', 'width': '1000px'}),

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

app.layout = html.Div(children=[
    html.Div([
        html.H2("Singapore's Balance of Payments")
    ], className="banner"),

    dcc.Dropdown(
        id='balance-input',
        options=[
            {'label': x, 'value': x} for x in df.drop(columns=['date']).columns
        ],
        value='overall_balance',
        style={'height': '40px', 'width': '300px', 'margin-top': '10px'}
    ),
    html.Div([
        html.Div([
            dcc.Graph(
                id="graph_bop",
                style={'height': '500px', 'width': '900px', 'margin-bottom': '10px'}
            ),
        ], className="six columns"),

        html.Div([
            dash_table.DataTable(
                id = 'datatable',
                data=df_sub.loc[(df['date'] > datetime.datetime.today() - relativedelta(years=2))].to_dict('records'),
                style_table={'height': '500px', 'width': '500px', 'margin-top': '30px'},
            )
        ], className="six columns")
    ])
])

@app.callback(dash.dependencies.Output("graph_bop", "figure"),
            [dash.dependencies.Input("balance-input", "value")]
)
def update_fig(value):
    data = []
    trace_close = go.Scatter(x=list(df_sub.date),
                         y=list(df_sub[value]),
                         name="Balance of Payments",
                         line=dict(color="#fc0303"))
    data.append(trace_close)
    layout = {"title": "Balance (in millions)", 
              'xaxis': dict(
                        rangeselector=dict(
                            buttons=list([
                                dict(count=1,
                                    label="1m",
                                    step="month",
                                    stepmode="backward"),
                                dict(count=6,
                                    label="6m",
                                    step="month",
                                    stepmode="backward"),
                                dict(count=1,
                                    label="YTD",
                                    step="year",
                                    stepmode="todate"),
                                dict(count=1,
                                    label="1y",
                                    step="year",
                                    stepmode="backward"),
                                dict(step="all")
                            ])
                        )
    )}

    return {
        "data": data, "layout": layout
    } 

@app.callback(dash.dependencies.Output("datatable", "columns"),
            [dash.dependencies.Input("balance-input", "value")]
)
def update_table(value):
    return [{'id': c, 'name': c} for c in df_sub[["Date", value]].columns]

if __name__=="__main__":
    app.run_server(debug=True)
