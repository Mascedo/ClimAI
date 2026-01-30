export function errorMiddleware(err, req, res, next) {
    res.status(500).json({
        detalhe: err.message,
        sucesso: false,
        mensagem: "Ocorreu um erro interno no servidor"
    });
}