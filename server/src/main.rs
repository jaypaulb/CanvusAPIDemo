use actix_web::{web, App, HttpResponse, Responder, HttpServer};
use actix_web::get;
use serde::{Serialize, Deserialize};

#[derive(Serialize)]
struct Canvas {
    id : String,
    name : String,
    state : String,
}

#[get("canvases")]
fn canvases() -> impl Responder {

    let mut canvases = Vec::new();

    canvases.push(Canvas {
        id: "7776ff99-4f2f-49b9-ab5a-1c352cd53427".to_string(),
        name: "New canvas".to_string(),
        state: "normal".to_string()
    });

    canvases.push(Canvas {
        id: "87111548-db8c-48df-a103-4fa45e513514".to_string(),
        name: "Another canvas".to_string(),
        state: "normal".to_string()
    });

    HttpResponse::Ok().json(canvases)
}

fn main() {

    HttpServer::new(|| {
        App::new().service(
            web::scope("/api/v1/")
                .service(canvases)
        )
    })
    .bind("127.0.0.1:4000")
    .unwrap()
    .run()
    .unwrap();
}