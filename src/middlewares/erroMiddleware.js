export function errorMiddleware(err, req, res, next) {
    res.status(500).json({
        sucesso: false,
        mensagem: "Ocorreu um erro interno no servidor",
        detalhe: err.message
    });
}